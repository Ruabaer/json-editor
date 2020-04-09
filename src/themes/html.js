JSONEditor.defaults.themes.html = JSONEditor.AbstractTheme.extend({
  /* Theme config options that allows changing various aspects of the output */
  options: {
    'disable_theme_rules': false
  },
  /* Custom stylesheet rules. format: "selector" : "CSS rules" */
  rules: {
  'div[data-schemaid="root"]:after': 'position:relative;color:red;margin:10px 0;font-weight:600;display:block;width:100%;text-align:center;content:"This is an old JSON-Editor 1.x Theme and might not display elements correctly when used with the 2.x version"'
  },
  /*
  // 调整输入框位置
  getFormInputLabel: function(text, req) {
    var el = this._super(text, req);
    el.style.display = 'block';
    el.style.marginBottom = '3px';
    el.style.fontWeight = 'bold';
    return el;
  },
  */
  getFormInputDescription: function(text) {
    var el = this._super(text);
    el.style.fontSize = '.8em';
    el.style.margin = 0;
    el.style.display = 'inline-block';
    el.style.fontStyle = 'italic';
    return el;
  },
  /*
  getIndentedPanel: function() {
    var el = this._super();
    el.style.border = '1px solid #ddd';
    el.style.padding = '5px';
    el.style.margin = '10px';
    el.style.borderRadius = '3px';
    return el;
  },
  */
  getTopIndentedPanel: function() {
    return this.getIndentedPanel();
  },
  getChildEditorHolder: function() {
    var el = this._super();
    el.style.marginBottom = '8px';
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.display = 'inline-block';
    el.style.marginLeft = '10px';
    el.style.fontSize = '.8em';
    el.style.verticalAlign = 'middle';
    return el;
  },
  getTable: function() {
    var el = this._super();
    el.style.borderBottom = '1px solid #ccc';
    el.style.marginBottom = '5px';
    return el;
  },
  addInputError: function(input, text) {
    input.style.borderColor = 'red';
    
    if(!input.errmsg) {
      var group = this.closest(input,'.form-control');
      input.errmsg = document.createElement('div');
      input.errmsg.setAttribute('class','errmsg');
      input.errmsg.style = input.errmsg.style || {};
      input.errmsg.style.color = 'red';
      group.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = 'block';
    }
    
    input.errmsg.innerHTML = '';
    input.errmsg.appendChild(document.createTextNode(text));
  },
  removeInputError: function(input) {
    if(input.style) input.style.borderColor = '';
    if(input.errmsg) input.errmsg.style.display = 'none';
  },
  getProgressBar: function() {
    var max = 100, start = 0;

    var progressBar = document.createElement('progress');
    progressBar.setAttribute('max', max);
    progressBar.setAttribute('value', start);
    return progressBar;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;
    progressBar.setAttribute('value', progress);
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;
    progressBar.removeAttribute('value');
  },
  getSwitchFormControl: function (label, input, description,self) {
      var group = document.createElement('div');
      var el = document.createElement('div');
      var lab=document.createElement('label');
      group.className = 'form-group';
      el.className = 'switch';
      if (label) group.appendChild(label);
      var uuid=this.GenNonDuplicateID();
      input.id=uuid;
      lab.setAttribute('for',uuid);
      lab.style.userSelect='none';
      input.style.display='none';
      if(self.schema.default) input.setAttribute('data-switch','on');
      else input.setAttribute('data-switch','off');
      el.appendChild(input);
      el.appendChild(lab);
      group.appendChild(el);
      if (description) group.appendChild(description);
      return group;
  },
  getFormControlB3: function (label, input, description) {
      var group = document.createElement('div');

      if (label && input.type === 'checkbox') {
          group.className += ' checkbox';
          label.appendChild(input);
          label.style.fontSize = '14px';
          group.style.marginTop = '0';
          group.appendChild(label);
          input.style.position = 'relative';
          input.style.cssFloat = 'left';
      }
      else {
          group.className += ' form-group';
          if (label) {
              label.className += ' control-label';
              group.appendChild(label);
          }
          group.appendChild(input);
      }

      if (description) group.appendChild(description);

      return group;
  },
  getFormControlB3CK: function (label, input, description, self) {
      var group = document.createElement('div');
      var uuid = self.theme.GenNonDuplicateID();

      if (label && input.type === 'checkbox') {
          group.className += ' checkbox';
          label.appendChild(input);
          group.style.marginTop = '0';
          group.appendChild(label);
          input.style.position = 'relative';
          input.style.cssFloat = 'left';
      }
      else {
          var ck = self.theme.getCheckbox();
          group.className += ' form-group';
          if (label) {
              ck.id = uuid;
              label.setAttribute('for', uuid);
              label.className += ' control-label';
              label.style.lineHeight = 2;
              label.style.cursor = 'pointer';
              label.style.userSelect = 'none';
              group.appendChild(ck);
              group.appendChild(label);
          }
          group.appendChild(input);
      }

      if (description) group.appendChild(description);

      return group;
  },
  getIndentedPanel: function () {
      var el = document.createElement('div');
      el.className = 'v3-base-json-editor__well';
      el.style.paddingBottom = 0;
      return el;
  },
  //颜色组panel
  getIndentedPanelArray: function () {
      var el = document.createElement('div');
      el.className = ' arraycolor';
      el.style.width = '28px';
      el.style.height='28px';
      el.style.marginRight = '5px';
      return el;
  },
  //自定义布局无checkbox 无label 数组颜色专用
  getFormControlB3Array: function (label, input, description, self) {
      var group = document.createElement('div');

      group.className += ' form-group';
      // group.style.marginBottom = 0;
      if (label) {
          label.className += ' control-label';
          label.style.lineHeight = 2;
          label.style.cursor = 'pointer';
          label.style.userSelect = 'none';
          label.style.display = 'none';
          group.appendChild(label);
      }
      group.appendChild(input);

      if (description) group.appendChild(description);

      return group;
  },
  getHTabHolder: function () {
      var el = document.createElement('div');
      el.innerHTML = "<div class='tabs list-group col-md-12 clearpad'></div><div class='col-md-12 well well-sm clearpad'></div>";
      el.className = 'rows';
      return el;
  },
  getHTab: function (text) {
      var el = document.createElement('a');
      el.className = 'list-group-item col-md-6';
      el.setAttribute('href', '#');
      el.appendChild(text);
      return el;
  },
  setGridColumnSize: function (el, size) {
      el.className = 'col-md-' + size;
  },
  getSelectInput: function (options) {
      var el = this._super(options);
      el.className += 'form-control';
      //el.style.width = 'auto';
      return el;
  },
  getTextareaInput: function () {
      var el = document.createElement('textarea');
      el.className = 'form-control';
      return el;
  },
  getFormInputField: function (type) {
      var el = this._super(type);
      if (type !== 'checkbox') {
          el.className += 'form-control';
      }
      return el;
  },
  afterInputReady: function (input) {
      if (input.controlgroup) return;
      input.controlgroup = this.closest(input, '.form-group');
      if (this.closest(input, '.compact')) {
          input.controlgroup.style.marginBottom = 0;
      }

      // TODO: use bootstrap slider
  },
  getButton: function (text, icon, title) {
      var el = this._super(text, icon, title);
      el.className += 'btn btn-default';
      el.style.backgroundColor='transparent';
      el.style.border='none';
      return el;
  }
});
