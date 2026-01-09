function doPost(e) {
  try {
    // Parse os dados recebidos
    const data = JSON.parse(e.postData.contents);

    // Pega a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Formata a data
    const timestamp = new Date(data.timestamp);
    const formattedDate = Utilities.formatDate(timestamp, "America/Sao_Paulo", "dd/MM/yyyy HH:mm:ss");

    // Adiciona os dados na planilha
    sheet.appendRow([
      formattedDate,
      data.name,
      data.email,
      data.phone,
      data.demand
    ]);

    // Envia e-mail de notificação
    const emailBody = "Nova mensagem recebida do site!\n\n" +
      "Nome: " + data.name + "\n" +
      "E-mail: " + data.email + "\n" +
      "Telefone: " + data.phone + "\n\n" +
      "Demanda:\n" + data.demand + "\n\n" +
      "---\n" +
      "Data/Hora: " + formattedDate;

    MailApp.sendEmail({
      to: "rafaelchicaroni.fotografo@gmail.com",
      subject: "🔔 Novo Contato no Site: " + data.name,
      body: emailBody
    });

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Dados salvos com sucesso"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
