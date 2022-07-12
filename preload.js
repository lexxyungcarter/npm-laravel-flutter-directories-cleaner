const ipcRenderer = require("electron").ipcRenderer;

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const btnclick = document.getElementById("delete");
  btnclick.addEventListener("click", function () {
    ipcRenderer.send("btnclick"); // ipcRender.send will pass the information to main process
  });

  ipcRenderer.on("btnclick-task-finished", function (event, param) {
    alert("The task has been finished!");
  });

  const statusDiv = document.getElementById("deleted-list");
  ipcRenderer.on("task-status", function (event, msg) {
    let c = statusDiv.innerHTML;

    c.length < 1
      ? (statusDiv.innerHTML = msg)
      : (statusDiv.innerHTML = c + "<br/>" + msg);
  });
});
