// bootstrap3.js ↓
JSONEditor.defaults.themes.bootstrap3 = JSONEditor.AbstractTheme.extend({
  getSelectInput: function(options) {
    var el = this._super(options);
    el.className += 'form-control';
    //el.style.width = 'auto';
    return el;
  },
  setGridColumnSize: function(el,size) {
    el.className = 'col-md-'+size;
  },
  afterInputReady: function(input) {
    if(input.controlgroup) return;
    input.controlgroup = this.closest(input,'.form-group');
    if(this.closest(input,'.compact')) {
      input.controlgroup.style.marginBottom = 0;
    }
    if (this.queuedInputErrorText) {
        var text = this.queuedInputErrorText;
        delete this.queuedInputErrorText;
        this.addInputError(input,text);
    }

    // TODO: use bootstrap slider
  },
  getTextareaInput: function() {
    var el = document.createElement('textarea');
    el.className = 'form-control';
    return el;
  },
  getRangeInput: function(min, max, step) {
    // TODO: use better slider
    return this._super(min, max, step);
  },
  getFormInputField: function(type) {
    var el = this._super(type);
    if(type !== 'checkbox') {
      el.className += 'form-control';
    }
    return el;
  },
  getFormControl: function(label, input, description, infoText) {
    var group = document.createElement('div');

    if(label && input.type === 'checkbox') {
      group.className += ' checkbox';
      label.appendChild(input);
      label.style.fontSize = '14px';
      group.style.marginTop = '0';
      if(infoText) group.appendChild(infoText);
      group.appendChild(label);
      input.style.position = 'relative';
      input.style.cssFloat = 'left';
    }
    else {
      group.className += ' form-group';
      if(label) {
        label.className += ' control-label';
        group.appendChild(label);
      }

      if(infoText) group.appendChild(infoText);
      group.appendChild(input);
    }

    if(description) group.appendChild(description);

    return group;
  },
  //  自定义布局带checkbox
  getFormControlB3: function (label, input, description, self) {
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
  getIndentedPanel: function() {
    var el = document.createElement('div');
    el.className = 'well well-sm';
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
  getInfoButton: function(text) {
    var icon = document.createElement('span');
    icon.className = "glyphicon glyphicon-info-sign pull-right";
    icon.style.padding = ".25rem";
    icon.style.position = "relative";
    icon.style.display = "inline-block";

    var tooltip = document.createElement('span');
    tooltip.style["font-family"] = "sans-serif";
    tooltip.style.visibility = "hidden";
    tooltip.style["background-color"] = "rgba(50, 50, 50, .75)";
    tooltip.style.margin = "0 .25rem";
    tooltip.style.color = "#FAFAFA";
    tooltip.style.padding = ".5rem 1rem";
    tooltip.style["border-radius"] = ".25rem";
    tooltip.style.width = "25rem";
    tooltip.style.transform = "translateX(-27rem) translateY(-.5rem)";
    tooltip.style.position = "absolute";
    tooltip.innerText = text;
    icon.onmouseover = function() {
      tooltip.style.visibility = "visible";
    };
    icon.onmouseleave = function() {
      tooltip.style.visibility = "hidden";
    };

    icon.appendChild(tooltip);

    return icon;
  },
  getFormInputDescription: function(text) {
    var el = document.createElement('p');
    el.className = 'help-block';
    el.innerHTML = text;
    return el;
  },
  getHeaderButtonHolder: function() {
    var el = this.getButtonHolder();
    el.style.marginLeft = '10px';
    return el;
  },
  getButtonHolder: function() {
    var el = document.createElement('div');
    el.className = 'btn-group';
    return el;
  },
  getButton: function(text, icon, title) {
    var el = this._super(text, icon, title);
    el.className += 'btn btn-default';
    el.style.backgroundColor='transparent';
        el.style.border='none';
    return el;
  },
  getTable: function() {
    var el = document.createElement('table');
    el.className = 'table table-bordered';
    el.style.width = 'auto';
    el.style.maxWidth = 'none';
    return el;
  },

  addInputError: function(input,text) {
    if(!input.controlgroup) {
        this.queuedInputErrorText = text;
        return;
    }
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
    input.controlgroup.className += ' has-error';
    if(!input.errmsg) {
      input.errmsg = document.createElement('p');
      input.errmsg.className = 'help-block errormsg';
      input.controlgroup.appendChild(input.errmsg);
    }
    else {
      input.errmsg.style.display = '';
    }

    input.errmsg.textContent = text;
  },
  removeInputError: function(input) {
    if(!input.controlgroup) {
        delete this.queuedInputErrorText;
    }
    if(!input.errmsg) return;
    input.errmsg.style.display = 'none';
    input.controlgroup.className = input.controlgroup.className.replace(/\s?has-error/g,'');
  },
  getTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='col-md-2 nav nav-pills nav-stacked' id='" + pName + "' role='tablist'></ul>" +
      "<div class='col-md-10 tab-content well well-small'  id='" + pName + "'></div>";
    return el;
  },
  getTopTabHolder: function(propertyName) {
    var pName = (typeof propertyName === 'undefined')? "" : propertyName;
    var el = document.createElement('div');
    el.innerHTML = "<ul class='nav nav-tabs' id='" + pName + "' role='tablist'></ul>" +
      "<div class='tab-content well well-small'  id='" + pName + "'></div>";
    return el;
  },
  getHTabHolder: function () {
    var el = document.createElement('div');
    el.innerHTML = "<div class='tabs list-group col-md-12 clearpad'></div><div class='col-md-12 well well-sm clearpad'></div>";
    el.className = 'rows';
    return el;
  },
  getTab: function(text, tabId) {
    var li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    a.setAttribute('aria-controls', tabId);
    a.setAttribute('role', 'tab');
    a.setAttribute('data-toggle', 'tab');
    li.appendChild(a);
    return li;
  },
  getHTab: function (text) {
    var el = document.createElement('a');
    el.className = 'list-group-item col-md-6';
    el.setAttribute('href', '#');
    el.appendChild(text);
    return el;
  },
  getTopTab: function(text, tabId) {
    var li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    var a = document.createElement('a');
    a.setAttribute('href','#'+tabId);
    a.appendChild(text);
    a.setAttribute('aria-controls', tabId);
    a.setAttribute('role', 'tab');
    a.setAttribute('data-toggle', 'tab');
    li.appendChild(a);
    return li;
  },
  getTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-pane';
    el.setAttribute('role', 'tabpanel');
    return el;
  },
  getTopTabContent: function() {
    var el = document.createElement('div');
    el.className = 'tab-pane';
    el.setAttribute('role', 'tabpanel');
    return el;
  },
  markTabActive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.tab.className += ' active';
    row.container.className = row.container.className.replace(/\s?active/g,'');
    row.container.className += ' active';
    // row.container.style.display = '';
  },
  markTabInactive: function(row) {
    row.tab.className = row.tab.className.replace(/\s?active/g,'');
    row.container.className = row.container.className.replace(/\s?active/g,'');
    // row.container.style.display = 'none';
  },
  getProgressBar: function() {
    var min = 0, max = 100, start = 0;

    var container = document.createElement('div');
    container.className = 'progress';

    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuenow', start);
    bar.setAttribute('aria-valuemin', min);
    bar.setAttribute('aria-valuenax', max);
    bar.innerHTML = start + "%";
    container.appendChild(bar);

    return container;
  },
  updateProgressBar: function(progressBar, progress) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    var percentage = progress + "%";
    bar.setAttribute('aria-valuenow', progress);
    bar.style.width = percentage;
    bar.innerHTML = percentage;
  },
  updateProgressBarUnknown: function(progressBar) {
    if (!progressBar) return;

    var bar = progressBar.firstChild;
    progressBar.className = 'progress progress-striped active';
    bar.removeAttribute('aria-valuenow');
    bar.style.width = '100%';
    bar.innerHTML = '';
  }
});
// bootstrap3.js ↑
