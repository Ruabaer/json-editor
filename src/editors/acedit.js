// acedit.js ↓
/**
 * Created by Administrator on 2017/5/25.
 */
JSONEditor.defaults.editors.acedit=JSONEditor.AbstractEditor.extend({
    register: function () {
        this._super();
        if (!this.input) return;
        this.input.setAttribute('name', this.formname);
    },
    setValue: function (value, initial, from_template) {
        var self = this;

        if (this.template && !from_template) {
            return;
        }

        if (value === null || typeof value === 'undefined') value = "";
        else if (typeof value === "object") value = JSON.stringify(value);
        else if (typeof value !== "string") value = "" + value;

        if (value === this.serialized) return;

        // Sanitize value before setting it
        var sanitized = this.sanitize(value);

        if (this.input.value === sanitized) {
            return;
        }

        this.input.value = sanitized;

        // If using SCEditor, update the WYSIWYG
       if (this.ace_editor) {
            this.ace_editor.setValue(sanitized);
        }

        var changed = from_template || this.getValue() !== value;

        this.refreshValue();

        if (initial) this.is_dirty = false;
        else if (this.jsoneditor.options.show_errors === "change") this.is_dirty = true;

        if (this.adjust_height) this.adjust_height(this.input);

        // Bubble this setValue to parents if the value changed
        this.onChange(changed);
    },
    sanitize: function (value) {
        var sanitized=value.replace(/(\n\s?)|(\s{3,})/g,"");
        return sanitized;
    },
    build:function () {
        var self = this, i;
        if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
        if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

        this.format = this.schema.format;
        this.programe_language=this.schema.programe_language;



        if (!this.format && this.schema.media && this.schema.media.type) {
            this.format = this.schema.media.type.replace(/(^(application|text)\/(x-)?(script\.)?)|(-source$)/g, '');
        }
        if (!this.format && this.options.default_format) {
            this.format = this.options.default_format;
        }
        if (this.options.format) {
            this.format = this.options.format;
        }
        //判断需要支持的语言类型
        if ([
                'actionscript',
                'batchfile',
                'bbcode',
                'c',
                'c++',
                'cpp',
                'coffee',
                'csharp',
                'css',
                'dart',
                'django',
                'ejs',
                'erlang',
                'golang',
                'groovy',
                'handlebars',
                'haskell',
                'haxe',
                'html',
                'ini',
                'jade',
                'java',
                'javascript',
                'json',
                'less',
                'lisp',
                'lua',
                'makefile',
                'markdown',
                'matlab',
                'mysql',
                'objectivec',
                'pascal',
                'perl',
                'pgsql',
                'php',
                'python',
                'r',
                'ruby',
                'sass',
                'scala',
                'scss',
                'smarty',
                'sql',
                'stylus',
                'svg',
                'twig',
                'vbscript',
                'xml',
                'yaml'
            ].indexOf(this.programe_language) >= 0
        ) {
            this.input_type = this.programe_language;
            this.source_code = true;
            this.input = this.theme.getTextareaInput();
        }

        if (this.options.compact) this.container.className += ' compact';

        var uuid = this.theme.GenNonDuplicateID();
        this.input = this.draw(uuid);
        this.run_btn=document.createElement('input');
        this.run_btn.type='button';
        this.run_btn.value='RUN';

        this.input
            .addEventListener('change', function (e) {
                e.preventDefault();
                e.stopPropagation();

                // Don't allow changing if this field is a template
                if (self.schema.template) {
                    this.value = self.value;
                    return;
                }

                var val = this.value;

                // sanitize value
                var sanitized = self.sanitize(val);
                if (val !== sanitized) {
                    this.value = sanitized;
                }

                self.is_dirty = true;

                self.refreshValue();
                self.onChange(true);
            });

        if (this.format) this.input.setAttribute('data-schemaformat', this.format);

        this.control = this.theme.getFormControlB3(this.label, this.input, this.description, this);
        this.control.appendChild(this.run_btn);
        this.container.appendChild(this.control);


        // Any special formatting that needs to happen after the input is added to the dom
        window.requestAnimationFrame(function () {
            // Skip in case the input is only a temporary editor,
            // otherwise, in the case of an ace_editor creation,
            // it will generate an error trying to append it to the missing parentNode
             self.setupAce();
            // if (self.adjust_height) self.adjust_height(self.input);
        });

        // Compile and store the template
        if (this.schema.template) {
            this.template = this.jsoneditor.compileTemplate(this.schema.template, this.template_engine);
            this.refreshValue();
        }
        else {
            this.refreshValue();
        }

        //设置初始状态
        this.initstatus(this.label);
        //监听checkbox
        this.checkListener();


    },
    initstatus:function (label) {//初始化状态 是否禁用
        if(this.schema.disable) {
            this.input.disabled=true;
            this.theme.disableLabel(label);
            this.control.firstElementChild.checked=false;
        }else {
            this.control.firstElementChild.checked=true;
        }
    },
    enable: function () {
        if (!this.always_disabled) {
            this.input.disabled = false;
            this.run_btn.disabled=false;
            // TODO: WYSIWYG and Markdown editors
            if(this.label) this.theme.enableLabel(this.label);
            this.value=this.input.value;
        }
        //去掉遮罩层
        var spanAce = this.label.nextSibling;
        var spanAceCover = spanAce.getElementsByClassName('aceCover')[0];
        spanAce.removeChild(spanAceCover);

        this.refreshValue();
        this.onChange(true);
        this._super();
    },
    disable: function () {
        this.input.disabled = true;
        this.run_btn.disabled=true;
        // TODO: WYSIWYG and Markdown editors
        if(this.label) this.theme.disableLabel(this.label);
        this.value=null;

        //添加遮罩层
        var spanAce = this.label.nextSibling;
        var spanAceCover = document.createElement('div');
        spanAce.appendChild(spanAceCover);
        spanAceCover.className = 'aceCover';
        spanAceCover.style.backgroundColor = '#777';
        spanAceCover.style.opacity = '0.7';
        spanAceCover.style.position = 'absolute';
        spanAceCover.style.top = '0';
        spanAceCover.style.left = '0';
        spanAceCover.style.right = '0';
        spanAceCover.style.bottom = '0';
        spanAceCover.style.zIndex = 50;
        spanAceCover.style.cursor = 'not-allowed';


        //此处为了禁用后input中仍显示之前的值，所以不进行refresh

        this.onChange(true);
        this._super();
    },
    draw:function () {
        var self=this;
        this.ace_container = document.createElement('div');
        this.ace_container.style.width = '100%';
        this.ace_container.style.position = 'relative';
        this.ace_container.style.height = '100px';
        return this.ace_container;
    },
    setupAce:function () {
        var self=this;
        var mode = this.input_type;
        this.ace_editor = window.ace.edit(this.ace_container);

        this.ace_editor.setValue(this.sanitize(this.getValue()));

        // The theme
        if (JSONEditor.plugins.ace.theme) this.ace_editor.setTheme('ace/theme/' + JSONEditor.plugins.ace.theme);
        // The mode
        this.ace_editor.getSession().setMode('ace/mode/'+mode);

        // Listen for changes
        this.ace_editor.on('change', function () {
            var val = self.ace_editor.getValue();
            self.input.value = val.replace(/(\n\s?)|(\s{3,})/g,"");
            self.refreshValue();
            self.is_dirty = true;
            self.onChange(true);
        });
        this.run_btn
            .addEventListener('click',function(e){
                e.preventDefault();
                e.stopPropagation();
                var content=self.input.value;
                // var jsexp='<script>'+content+'<\/script>';
                var script=document.createElement('script');
                script.innerHTML=content;
                document.body.appendChild(script);
            });
    },
    onWatchedFieldChange: function () {
        var self = this, vars, j;

        // If this editor needs to be rendered by a macro template
        if (this.template) {
            vars = this.getWatchedFieldValues();
            this.setValue(this.template(vars), false, true);
        }

        this._super();
    },
    refreshValue: function () {
        this.value = this.input.value;
        if (typeof this.value !== "string") this.value = '';
        this.serialized = this.value;
    },

    //checkbox点击监听
    checkListener: function () {
        var self = this;
        var checkboxes = self.control.firstElementChild;
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
});
// acedit.js ↑