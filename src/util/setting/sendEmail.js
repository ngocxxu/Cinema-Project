import React from "react";

export default function sendEmail(props) {
  return (
    <div>
      <div>
        /* SmtpJS.com - v3.0.0 */ var Email = {"{"} send: function (a) {"{"}{" "}
        return new Promise(function (n, e) {"{"} a.nocache = Math.floor(1e6 *
        Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a);
        Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e){" "}
        {"{"} n(e) {"}"}) {"}"}) {"}"}, ajaxPost: function (e, n, t) {"{"} var a
        = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded"), a.onload = function () {"{"} var e
        = a.responseText; null != t &amp;&amp; t(e) {"}"}, a.send(n) {"}"},
        ajax: function (e, n) {"{"} var t = Email.createCORSRequest("GET", e);
        t.onload = function () {"{"} var e = t.responseText; null != n
        &amp;&amp; n(e) {"}"}, t.send() {"}"}, createCORSRequest: function (e,
        n) {"{"} var t = new XMLHttpRequest; return "withCredentials" in t ?
        t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new
        XDomainRequest).open(e, n) : t = null, t {"}"} {"}"};
      </div>
    </div>
  );
}


<iframe width="1280" height="720" src="https://www.youtube.com/embed/T36HGZagV5w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>