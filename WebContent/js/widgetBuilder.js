"use strict";

define([
        "dojo/_base/array",
        "dojox/mvc/at",
        "dojo/_base/declare",
        "dojo/dom",
        "js/domain",
        "dojo/dom-construct",
        "dojo/dom-style",
        "dojo/_base/lang",
        "dojo/on",
        "dijit/registry",
        "js/translate",
        "js/utility",
        "js/widget-grid-table",
        "js/widget-questions-table",
        "js/widget-story-browser",
        "dojox/charting/plot2d/Bars",
        "dijit/form/Button",
        "dijit/form/CheckBox",
        "dijit/layout/ContentPane",
        "dijit/form/FilteringSelect",
        "dijit/form/HorizontalRule",
        "dijit/form/HorizontalRuleLabels",
        "dijit/form/HorizontalSlider",
        "dojo/store/Memory",
        "dijit/form/RadioButton",
        "dijit/form/Select",
        "dijit/form/SimpleTextarea",
        "dijit/form/TextBox",
        "dijit/form/ToggleButton",
        "dijit/_WidgetBase"
    ], function(
        array,
        at,
        declare,
        dom,
        domain,
        domConstruct,
        domStyle,
        lang,
        on,
        registry,
        translate,
        utility,
        widgetGridTable,
        widgetQuestionsTable,
        widgetStoryBrowser,
        Bars,
        Button,
        CheckBox,
        ContentPane,
        FilteringSelect,
        HorizontalRule,
        HorizontalRuleLabels,
        HorizontalSlider,
        Memory,
        RadioButton,
        Select,
        SimpleTextarea,
        TextBox,
        ToggleButton,
        _WidgetBase
    ){
    
    function add_label(contentPane, model, id, options) {
        var label = new ContentPane({
            content: translate(id + "::prompt")
        });
        label.placeAt(contentPane);
        label.startup();
        return label;
    }
    
    function add_header(contentPane, model, id, options) {
        var label = new ContentPane({
            content: "<b>" + translate(id + "::prompt") + "</b>"
        });
        label.placeAt(contentPane);
        label.startup();
        return label;
    }
    
    function add_image(contentPane, model, id, options) {
        var imageSource = options[0];
        var questionText = translate(id + "::prompt", "");
        var label = new ContentPane({
            content: "<br>" + '<img src="' + imageSource + '" alt="Image for question: ' + questionText + '">'
        });
        label.placeAt(contentPane);
        label.startup();
        return label;
    }
    
    function addPromptTextIfNeeded(contentPane, id) {
        var questionText = translate(id + "::prompt", "");
        if (questionText) {
            var label = new ContentPane({
                content: questionText
            });
            label.placeAt(contentPane);
            label.startup();        
        }
    }
    
    function add_text(contentPane, model, id, options) {
        addPromptTextIfNeeded(contentPane, id);
        var textBox = new TextBox({
            value: at(model, id)
        });
        textBox.placeAt(contentPane);
        textBox.startup();
        return textBox;
    }
    
    function add_textarea(contentPane, model, id, options) {
        addPromptTextIfNeeded(contentPane, id); 
        var textarea = new SimpleTextarea({
            rows: "4",
            cols: "80",
            style: "width:auto;",
            value: at(model, id)
        });
        textarea.placeAt(contentPane);
        textarea.startup();
        return textarea;
    }
    
    function add_grid(contentPane, model, id, options) {
        // Grid with list of objects
        // console.log("add_grid");
        
        addPromptTextIfNeeded(contentPane, id);
        
        var popupPageDefinition = domain.pageDefinitions[options[0]];
        
        if (!popupPageDefinition) {
            console.log("Trouble: no popupPageDefinition for options: ", id, options);
        }
        
        var value = model[id];
        
        return widgetGridTable.insertGridTableBasic(id, contentPane, popupPageDefinition, value, true);
    }
    
    function add_select(contentPane, model, id, questionOptions, addNoSelectionOption) {
        addPromptTextIfNeeded(contentPane, id);
        
        var options = [];
        // TODO: Translate label for no selection
        if (addNoSelectionOption) options.push({name: " -- select -- ", id: "", selected: true});
        if (questionOptions) {
            array.forEach(questionOptions, function(each) {
                // console.log("choice", id, each);
                if (utility.isString(each)) {
                    var label = translate(id + "::selection:" + each);
                    options.push({name: label, id: each});
                } else {
                    // TODO: Maybe bug in dojo select that it does not handle values that are not strings
                    // http://stackoverflow.com/questions/16205699/programatically-change-selected-option-of-a-dojo-form-select-that-is-populated-b
                    options.push({name: each.label, id: each.value});
                }
            });           
        } else {
            console.log("No choices or options defined for select", id);
        }
        
        var dataStore = new Memory({"data": options});
        
        var select = new FilteringSelect({
                id: id,
                store: dataStore,
                searchAttr: "name",
                // TODO: Work on validation...
                required: false
                // style: "width: 100%"
        });
        
        select.placeAt(contentPane);
        select.startup();
        return select;
    }
    
    return {
        "add_label": add_label,
        "add_header": add_header,
        "add_image": add_image,
        "add_text": add_text,
        "add_textarea": add_textarea,
        "add_grid": add_grid,
        "add_select": add_select
    };
});