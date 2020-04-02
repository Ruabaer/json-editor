// minicolor.js ↓
/**
 * Created by Administrator on 2017/4/27.
 */
JSONEditor.defaults.editors.minicolor = JSONEditor.AbstractEditor.extend({
    register: function () {
        this._super();
    },
    typecast: function (value) {
        if (this.schema.type === "boolean") {
            return !!value;
        }
        else if (this.schema.type === "number") {
            return 1 * value;
        }
        else if (this.schema.type === "integer") {
            return Math.floor(value * 1);
        }
        else {
            return "" + value;
        }
    },
    setValue: function (value) {
        this.value = value;
        this.input.value = value;
        jQuery(this.input).minicolors('value', value);
        this.change();
    },
    getValue: function () {
        return this.value;
    },
    refreshValue: function () {
        this.value = this.getValue();
    },
    build: function () {
        if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
        if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

        this.format = this.schema.format;

        var uuid = this.theme.GenNonDuplicateID();
        this.input = this.draw(uuid);

        if (this.options.compact) this.container.className += ' compact';
        if (this.parent.schema.type === 'array') {
            this.control = this.theme.getFormControlB3Array(this.label, this.input, this.description, this);
        } else {
            this.control = this.theme.getFormControlB3(this.label, this.input, this.description, this);
        }
        this.container.appendChild(this.control);

        this.setupMinicolor(this.label, uuid);
        //监听并赋值
        this.checkListener();
    },
    draw: function (uuid) {
        var self = this;
        var colorContainer;
        colorContainer = document.createElement('input');
        colorContainer.value = this.schema.default ? this.schema.default : "#ff6161";
        colorContainer.id = uuid;
        colorContainer.type = 'hidden';
        colorContainer.className = 'minicolor';
        return colorContainer;
    },
    setupMinicolor: function (label) {
        var self = this;
        var fn = {
            change: function (value, opacity) {
                self.value = value;
                self.refreshValue();
                self.onChange(true);
            }
        };
        var options;
        if (this.parent.schema.type === 'array'){
            var colorArray={
                colorArray:true
            };
            fn=$extend(fn,colorArray);
            options = $extend({}, JSONEditor.plugins.minicolor, fn);
        }else {
            options = $extend({}, JSONEditor.plugins.minicolor, fn);
        }
        this.miniColor = jQuery(this.input).minicolors(options);
        this.initstatus(label);
    },
    initstatus: function (label) {
        if (this.schema.disable) {
            this.theme.disableLabel(label);
        } else {
            if (this.control.firstElementChild.type == 'checkbox') {
                this.control.firstElementChild.checked = true;
            }
        }
    },
    checkListener: function () {
        var self = this;
        var checkboxes = self.control.firstElementChild;
        if (checkboxes.type == 'checkbox') {
            checkboxes.addEventListener('change', function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.checked) {
                    self.enable();
                } else {
                    self.disable();
                }

            });
        }

    },
    enable: function () {
        this.theme.enableLabel(this.label);
        this.value = this.input.value;
        //去掉遮罩层
        var spanMini = this.label.nextSibling;
        var spanMiniCover = spanMini.getElementsByClassName('miniCover')[0];
        spanMini.removeChild(spanMiniCover);

        this.refreshValue();
        this.onChange(true);
        this._super();
    },
    disable: function () {
        this.theme.disableLabel(this.label);

        this.input.value = this.value;
        this.value = null;

        //添加遮罩层
        var spanMini = this.label.nextSibling;
        var spanMiniCover = document.createElement('div');
        spanMini.appendChild(spanMiniCover);
        spanMiniCover.className = 'miniCover';
        spanMiniCover.style.backgroundColor = '#eee';
        spanMiniCover.style.position = 'absolute';
        spanMiniCover.style.top = '0';
        spanMiniCover.style.left = '0';
        spanMiniCover.style.right = '0';
        spanMiniCover.style.bottom = '0';
        spanMiniCover.style.zIndex = 50;
        spanMiniCover.style.cursor = 'not-allowed';


        this.is_dirty = true;

        // this.refreshValue();
        this.onChange(true);
        this._super();
    }
});
// minicolor.js ↑