/**
 * Created by Nobinuti on 23/05/2016.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'bootstrap',
    'text!../../templates/form/conversionForm.html',
    'text!../../templates/form/convAlertForm.html'
], function ($, _, Backbone, Bootstrap, ConversionTemplate, ConvAlertTemplate) {

    var ConvView = Backbone.View.extend({
        el: $('#conversion-container'),
        events:
        {
            "click #btn-conv"               :       "convert",
            "click #btn-reinitialize"       :       "reinitialize"
        },
        initialize:
            function ()
            {
                this.$el.append(ConversionTemplate);
                this.$el.append(ConvAlertTemplate);
                this.render();
            },
        render:
            function()
            {
                this.$el.show();
                return this;
            },

        checkUsable : function () {
            var url = window.location.href.split("#")[1];
            url = '#' + url;
            switch (url){
                case "#quiz":
                case "#bindecquiz":
                case "#binlogquiz":
                case "#binSumSubquiz":
                case "#binMultDivquiz":
                case "#hexdecquiz":
                case "#hexbinquiz":
                case "#game":
                case "#bingame":
                    return false;  // do not allow to use Converter
                    break;
                default:
                    return true;  // allow using Converter
                    break;
            }
        },

        test: function () {
            alert ("This is test from conversion View");
        },

        convert: function(){
            if(this.checkValidForm() == false)
                return false;
            var bin =  $('input#convBin').val();
            var dec =  $('input#convDec').val();
            var hex =  $('input#convHex').val();
            var inputType, yourBin, yourDec, yourHex;

            /*Convert dec to bin and hex*/
            if(dec != '') {
                inputType = "Décimal";
                /*verify if input of dec is valid*/
                if(this.isDec(dec) == false){  /*verify if input of dec is valid*/
                    this.showConvertResult("NaN", dec, "NaN");
                    return false;
                }
                inputNumber = parseInt(dec);
                yourDec = dec;
                yourBin = inputNumber.toString(2);
                yourHex = inputNumber.toString(16);
            }
            /*Convert bin to dec and hex*/
            if(bin != ''){
                inputType = "Binaire";
                /*verify if input of bin is valid*/
                if(this.isBin(bin) == false){
                    this.showConvertResult(bin, "NaN", "NaN");
                    return false;
                }
                inputNumber = parseInt(bin,2);
                yourBin = bin;
                yourDec = inputNumber.toString(10);
                yourHex = inputNumber.toString(16);
            }
            /*Convert hex to bin and dec*/
            if(hex != ''){
                inputType = "Hexadécimal";
                /*verify if input of hex is valid*/
                if(this.isHex(hex) == false){
                    this.showConvertResult("NaN", "NaN", hex);
                    return false;
                }
                inputNumber = parseInt(hex,16);
                yourHex = hex;
                yourDec = inputNumber.toString(10);
                yourBin = inputNumber.toString(2);
            }
            this.showConvertResult(yourBin, yourDec, yourHex);
        },

        isDec : function (inputNumber) {
            return /^[0-9]+$/.test(inputNumber);
        },

        isBin : function (inputNumber) {
            return /^[0-1]+$/.test(inputNumber);
        },

        isHex : function (inputNumber) {
            return /^[0-9a-fA-F]+$/.test(inputNumber);
        },

        reinitialize: function(){
            $('input#convBin').val("");
            $('input#convDec').val("");
            $('input#convHex').val("");
        },

        showConvertResult : function(binReslt, decReslt, hexReslt){
            $('input#convBin').val(binReslt);
            $('input#convDec').val(decReslt);
            $('input#convHex').val(hexReslt);
        },

        checkValidForm: function () {
            var bin =  $('input#convBin').val();
            var dec =  $('input#convDec').val();
            var hex =  $('input#convHex').val();
            if( bin == '' && dec == '' && hex == ''){
                return false;
            }
            if(
                (bin != '' && dec != '') ||
                (bin != '' && hex != '') ||
                (dec != '' && hex != '')
            ){
                this.reinitialize();
                return false;
            }
        },
        remove:
            function()
            {
                this.$el.empty();
            },
        add:
            function()
            {
                this.$el.append(ConversionTemplate);
            },
        hide:
            function()
            {
                this.$el.hide();
            },
        show:
            function()
            {
                this.reinitialize();
                this.$el.show();
            }
    });
    return ConvView;
});