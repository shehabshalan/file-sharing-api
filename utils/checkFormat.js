const checkFormat = (mimetype) => {
  if (mimetype === "image/jpeg") {
    return "jpg";
  }
  if (mimetype === "image/png") {
    return "png";
  }
  if (mimetype === "image/gif") {
    return "gif";
  }
  if (mimetype === "application/pdf") {
    return "pdf";
  }
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }
  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "xlsx";
  }
  if (mimetype === "text/csv") {
    return "csv";
  }
  if (mimetype === "text/plain") {
    return "txt";
  }
  if (mimetype === "application/vnd.ms-excel") {
    return "xls";
  }
  if (mimetype === "application/msword") {
    return "doc";
  }
  if (mimetype === "image/svg+xml") {
    return "svg";
  }
};

module.exports = checkFormat;
