const groupServiceUrl = process.env.GROUP_SERVICE_URL;
const groupServiceKey = process.env.GROUP_SERVICE_KEY;
const fetch = require("node-fetch");
const yotiUpdateApi = "/api/PutYotiVerifiedUser"

exports.updateUserService =  async function (context, userId, yotiId){
    context.log(userId);
    context.log(yotiId);
    context.log(`${groupServiceUrl}${yotiUpdateApi}?code=${groupServiceKey}`);
    var response = await fetch(`${groupServiceUrl}${yotiUpdateApi}?code=${groupServiceKey}`, {
        method: "PUT",
        mode: "same-origin",
        headers: {
          "Content-type": "application/json",
          "cache-control": "no-cache"
        },
        body: JSON.stringify({
          userId: userId,
          reference: yotiId,
          notes: ""
        }),
      });
      context.log(response);
      if (response.status === 200){
      var json = await response.json();
      context.log(json);
      if (json.hasContent && json.isSuccessful){
        return json.content;
      } else {
        throw 'User Service Put - Cannot unwrap JSON'
      }
      }
      else if (response.status === 401) {
          throw 'User Service Put Unauthorised: Is key valid? ' + userServiceKey
      } else {
          throw 'User Service Put Error'
      }
}
