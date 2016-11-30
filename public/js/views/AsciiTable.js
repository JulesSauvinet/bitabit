define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var AsciiTable = Backbone.View.extend({
    
        el : $('#ascii-table'),
        tagName: 'div',
        className: 'table-ascii',
        events: {},
    
        initialize: function (options) {
            this.options = options;
        },
    
        render: function () {

            var asciiMin= this.options.asciiMin;
            var asciiMax= this.options.asciiMax;
            
            for (var i in asciiMax) {
                var codeMinInt =  parseInt(i)+ 32;
                var codeMin = codeMinInt.toString();
                var caseAscii =  "<tr class=\"content asciiTable\">"+
                                    "<td class=\"col-sm-1\"><b>"+ asciiMax[i] + "</b></td>"+
                                    "<td class=\"col-sm-1\">"+  i  + "</td>"+
                                    "<td class=\"col-sm-1\"><b>"+ asciiMin[codeMin] + "</b></td>"+
                                    "<td class=\"col-sm-1\">"+ codeMin + "</td>"+
                                "</tr> ";

                $('#ascii-table tbody').append(caseAscii);

            }
        }
    });
    return AsciiTable;

});