<%@ Page Language="C#" %>

<!DOCTYPE html>
<html>
<head runat="server">
  <title>IIS Request Server Variables</title>
</head>
<body>
<h1>IIS - Request.ServerVariables[]</h1>
<%
  foreach (string var in Request.ServerVariables)
  {
    Response.Write(var + " " + Request[var] + "<br>");
  }
%>
</body>
</html>
