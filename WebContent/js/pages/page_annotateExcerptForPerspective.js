// Generated from design
"use strict";

define([], function() {

    var questions = [
        {"id":"perspective_excerptLinkageNotes", "type":"textarea", "isInReport":true, "isGridColumn":true}
    ];

    function buildPage(builder, contentPane, model) {
        builder.addQuestions(questions, contentPane, model);
    }

    return {
        "id": "page_annotateExcerptForPerspective",
        "type": "popup",
        "isHeader": false,
        "questions": questions,
        "buildPage": buildPage
    };
});