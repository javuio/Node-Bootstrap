//for more information:https://mandrillapp.com/api/docs/messages.nodejs.html
var mandrill = require('mandrill-api/mandrill');

var emails={
    client:null,
    init:function(config){emails.client=new mandrill.Mandrill(config.password);},
    send: function (fromAddress, toAddress, subject, body, options,callback) {
        var message = {
            "html" : body,
            "subject": subject,
            "from_email": fromAddress,
            "to": [{
                    "email": toAddress,
                    "type": "to"
                }]          
        };

        this.client.messages.send({ "message": message, "async": false }, function (result) {
        if(result.reject_reason != undefined && result.reject_reason != null)
            callback(err,null)
        else
            callback(null,true);
        /*Example of the result :)
        [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
        */
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            callback('A mandrill error occurred: ' + e.name + ' - ' + e.message,null)
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
        
    },
    sendEmailTemplate:function(templateName , paramObject, fromAddress, toAddress, subject, tag , options, callback){
        var template_name = templateName;
        var vars = [];
         for(var key in paramObject){
            vars.push({"name" : key , "content" : paramObject[key] });
        }
        var message = {
            "subject": subject,
            "from_email": fromAddress,
            "to": [{
                    "email": toAddress,
                    "type": "to"
                }],
            "merge": true,
            "merge_language": "handlebars",
            "merge_vars": [
            {
                "rcpt": toAddress,
                "vars":vars
            }
            ],
            "tags": [
        tag
            ]
        };

        this.client.messages.sendTemplate({ "template_name": template_name, "template_content": null, "message": message, "async": false }, function (result) {
        if(result.reject_reason != undefined && result.reject_reason != null)
            callback(err,null)
        else
            callback(null,true);
        /*Example of the result :)
        [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
        */
        }, function(e) {
            // Mandrill returns the error as an object with name and message keys
            callback('A mandrill error occurred: ' + e.name + ' - ' + e.message,null)
            // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
        });
    }
}


module.exports = emails;
