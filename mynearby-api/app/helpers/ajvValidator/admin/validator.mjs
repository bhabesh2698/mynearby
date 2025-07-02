export default {
    //User Login Validator
    loginValidator: function (value) {
        value = {
            type: "object",
            properties: {
                username: { type: "string", "minLength": 1, pattern: "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]|[à-ú]|[À-Ú]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?" },
                pwd: { type: "string", "minLength": 6, "maxLength": 16, pattern: "[A-Za-z0-9]" }
            },
            required: ["username", "pwd"],
            additionalProperties: {
                not: true,
                errorMessage: "${0#} is not allowed"
            }
        }
        return value;
    },

    editLessonConceptValidator: function (value) {
        value = {
            type: "object",
            properties: {
                lesson_topic_id: { type: "integer" },
                topic_concept_id: { type: "integer" },
                concept_expatn: { type: "string" },
                concept_no: {type: "string"},
                explana_vid: { type: "string" },
                explana_vid_url: { type: "string" },
                concept_compre: { type: "string" },
                concept_compre_vid: { type: "string" },
                concept_compre_vid_url: { type: "string" },
                corrct_ans: { type: "string" },
                no_match_corrct_ans: { type: "integer" },
                corrct_ans_score: { type: "integer" },
                corrct_ans_feedbk: { type: "string" },
                corrct_ans_feedbk_vid: { type: "string" },
                corrct_ans_feedbk_vid_url: { type: "string" },
                incorrct_ans: { type: "string" },
                min_no_match_expctd_incorr: { type: "integer" },
                // max_no_match_expctd_incorr: { type: "string" },
                max_no_match_expctd_incorr: { type: "integer" },
                // incorr_ans_score: { type: "string" },
                incorr_ans_score: { type: "integer" },
                incorrct_ans_feedbk: { type: "string" },
                incorrct_ans_feedbk_vid: { type: "string" },
                incorrct_ans_feedbk_vid_url: { type: "string" },
                partially_correct_ans: { type: "string" },
                // min_no_match_expctd_partially_correct_ans: { type: "string" },
                min_no_match_expctd_partially_correct_ans: { type: "integer" },
                max_no_match_expctd_partially_correct_ans: { type: "integer" },
                // max_no_match_expctd_partially_correct_ans: { type: "string" },
                partially_correct_ans_score: { type: "integer" },
                // partially_correct_ans_score: { type: "string" },
                partially_correct_ans_feedbk: { type: "string" },
                partially_correct_ans_vid: { type: "string" },
                partially_correct_ans_vid_url: { type: "string" },
            },
            required: ["lesson_topic_id", "topic_concept_id"],
            anyOf: [
                { required: ["concept_expatn"] },
                { required: ["concept_no"] },
                { required: ["explana_vid"] },
                { required: ["explana_vid_url"] },
                { required: ["concept_compre"] },
                { required: ["concept_compre_vid"] },
                { required: ["concept_compre_vid_url"] },
                { required: ["corrct_ans"] },
                { required: ["no_match_corrct_ans"] },
                { required: ["corrct_ans_score"] },
                { required: ["corrct_ans_feedbk"] },
                { required: ["corrct_ans_feedbk_vid"] },
                { required: ["corrct_ans_feedbk_vid_url"] },
                { required: ["incorrct_ans"] },
                { required: ["min_no_match_expctd_incorr"] },
                { required: ["max_no_match_expctd_incorr"] },
                { required: ["incorr_ans_score"] },
                { required: ["incorrct_ans_feedbk"] },
                { required: ["incorrct_ans_feedbk_vid"] },
                { required: ["incorrct_ans_feedbk_vid_url"] },
                { required: ["partially_correct_ans"] },
                { required: ["min_no_match_expctd_partially_correct_ans"] },
                { required: ["max_no_match_expctd_partially_correct_ans"] },
                { required: ["partially_correct_ans_score"] },
                { required: ["partially_correct_ans_feedbk"] },
                { required: ["partially_correct_ans_vid"] },
                { required: ["partially_correct_ans_vid_url"] }
            ],

            // required:  ["p_text"],
            additionalProperties: {
                not: true,
                // errorMessage: "${0#} is not allowed"
            }
        }
        return value
    },

    editClarificationValidator: function (value) {
        value = {
            type: "object",
            properties: {
                clarification_id: { type: "integer" },
                lesson_topic_id: { type: "integer" },
                // less_image: { type: "string" },
                clari_req: { type: "string" },
                clari_expec_match_min_no: { type: "integer" },
                clari_req_res: { type: "string" },
                clari_vid: { type: "string" },
                clari_vid_url: { type: "string" },
            },
            required: ["lesson_topic_id", "clarification_id"],
            anyOf: [
                // {required:  ["less_image"]},
                { required: ["clari_req"] },
                { required: ["clari_expec_match_min_no"] },
                { required: ["clari_req_res"] },
                { required: ["clari_vid"] },
                { required: ["clari_vid_url"] }
            ],
            // required:  ["p_text"],
            additionalProperties: {
                not: true,
                // errorMessage: "${0#} is not allowed"
            }
        }
        return value
    },

    editLessonValidator: function (value) {
        value = {
            type: "object",
            properties: {
                lesson_topic_id: { type: "integer" },
                less_name: { type: "string" },
                less_intro: { type: "string" },
                less_passing_mark: { type: "integer" },
                less_total_score: { type: "integer" },
                //  less_image: { type: "string" },
                less_image_url: { type: "string" },
                less_video: { type: "string" },
                less_video_url: { type: "string" },
                less_certi_text: { type: "string" },
                less_course_des_name: { type: "string" },
                less_course_des_title: { type: "string" },
                script_intro: { type: "string" },
                script_video: { type: "string" },
                script_video_url: { type: "string" },
                Introduce_review: { type: "string" },
                Introduce_review_vid: { type: "string" },
                Introduce_review_vid_url: { type: "string" },
                script_concl: { type: "string" },
                concl_video: { type: "string" },
                concl_video_url: { type: "string" },
                updated_at: { type: "string" },
            },
            required: ["lesson_topic_id"],
            anyOf: [
                // {required:  ["less_image"]},
                { required: ["less_name"] },
                { required: ["less_intro"] },
                { required: ["less_passing_mark"] },
                { required: ["less_total_score"] },
                { required: ["less_image_url"] },
                { required: ["less_video"] },
                { required: ["less_video_url"] },
                { required: ["less_certi_text"] },
                { required: ["less_course_des_name"] },
                { required: ["less_course_des_title"] },
                { required: ["script_intro"] },
                { required: ["script_video"] },
                { required: ["script_video_url"] },
                { required: ["Introduce_review"] },
                { required: ["Introduce_review_vid"] },
                { required: ["Introduce_review_vid_url"] },
                { required: ["concl_video_url"] },
                { required: ["script_concl"] },
                { required: ["concl_video"] },
            ],
            // required:  ["p_text"],
            additionalProperties: {
                not: true,
                // errorMessage: "${0#} is not allowed"
            }
        }
        return value
    },




};