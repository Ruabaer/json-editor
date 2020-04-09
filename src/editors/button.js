// Non-Active editor for displaying buttons in form
JSONEditor.defaults.editors.button = JSONEditor.AbstractEditor.extend({
  init: function(options) {
    this._super(options);
    this.active = false;

    // Set field to required in schema otherwize it will not be displayed
    if(this.parent && this.parent.schema) {
      if (Array.isArray(this.parent.schema.required)) {
        if(this.parent.schema.required.indexOf(this.key) === -1) {
          this.parent.schema.required.push(this.key);
        }
        else {
          this.parent.schema.required = [this.key];
        }
      }
    }
  },
  build: function() {

    this.options.compact = true;

      // Get options, either global options from "JSONEditor.defaults.options.button" or
      // single property options from schema "options.button"
    var options = this.expandCallbacks('button', $extend({}, {
      'text': this.key,
      'icon': '',
      'validated': false,
      'align': 'left',
      'action': function(jseditor, e) {
        alert('No button action defined for "' + jseditor.path + '"');
      }.bind(null, this)
    }, JSONEditor.defaults.options.button || {}, this.options.button || {}));

    this.input = this.theme.getFormButton(options.text, options.icon, options.text);
    this.input.addEventListener('click', options.action, false);

    if(this.schema.readOnly || this.schema.readonly || this.schema.template) {
      this.always_disabled = true;
      this.input.setAttribute('readonly', 'true');
    }

    // Set custom attributes on input element. Parameter is array of protected keys. Empty array if none.
    this.setInputAttributes(['readonly']);

    this.control = this.theme.getFormButtonHolder(options.align);
    this.control.appendChild(this.input);

    this.container.appendChild(this.control);

    var self = this;
    this.changeHandler = function() {
      if (self.jsoneditor.validate(self.jsoneditor.getValue()).length > 0) self.disable();
      else self.enable();
    };

    // Enable/disable the button depending on form validation
    if (options.validated) this.jsoneditor.on('change', this.changeHandler);

  },
  enable: function() {
    if(!this.always_disabled) {
      this.input.disabled = false;
      this._super();
    }
  },
  disable: function(always_disabled) {
    if(always_disabled) this.always_disabled = true;
    this.input.disabled = true;
    this._super();
  },
  getNumColumns: function() {
    return 2;
  },
  activate: function() {
    this.active = false;
    this.optInCheckbox.checked = true;
    this.enable();
    this.change();
  },
  deactivate: function() {
    // only non required properties can be deactivated.
    if (!this.isRequired()) {
      this.active = false;
      this.optInCheckbox.checked = false;
      this.disable();
      this.change();
    }
  },
  destroy: function() {
    this.jsoneditor.off('change', this.changeHandler);
    this.changeHandler = null;
    this._super();
  }
});
