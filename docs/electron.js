const { app, BrowserWindow } = require('electron')
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Criar uma janela de navegação.
    win = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false
		},
		icon: path.join(__dirname, 'logo.png')
	});

    // e carrega index.html do app.
    win.loadFile('admin.html')

	win.maximize();
	win.show();

    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitido quando a janela é fechada.
    win.on('closed', () => {
        // Elimina a referência do objeto da janela, geralmente você iria armazenar as janelas
        // em um array, se seu app suporta várias janelas, este é o momento
        // quando você deve excluir o elemento correspondente.
        win = null
    })
}

// var MAX_GIGABYTES = 4;
// var MAX_MEGABYTES = MAX_GIGABYTES * 1024;

// var clientCrt = path.join('/', '.xpd', 'keys', 'os', 'XPD-Client.crt');
var clientCrt = path.join(__dirname, 'keys', 'XPD-Client.crt');

app.commandLine.appendSwitch('client-certificate', clientCrt);
app.commandLine.appendSwitch('ignore-certificate-errors');
// app.commandLine.appendSwitch('js-flags', '--max_old_space_size=' + MAX_MEGABYTES);

// Este método será chamado quando o Electron tiver finalizado
// a inicialização e está pronto para criar a janela browser.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.on('ready', createWindow)

// Finaliza quando todas as janelas estiverem fechadas.
app.on('window-all-closed', () => {
    // No macOS é comum para aplicativos e sua barra de menu 
    // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

  // Neste arquivo, você pode incluir o resto do seu aplicativo especifico do processo
  // principal. Você também pode colocar eles em arquivos separados e requeridos-as aqui.