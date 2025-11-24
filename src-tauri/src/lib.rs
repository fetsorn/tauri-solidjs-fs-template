#![allow(warnings)]
mod error;

pub use error::{Error, Result};
use tauri::Manager;

// TODO no webview found after 2.7->2.9
pub fn log<R: tauri::Runtime>(app: &tauri::AppHandle<R>, message: &str) -> Result<()> {
    //#[cfg(dev)]
    //{
    //    println!("Message from Rust: {}", message);
    //}

    log::info!("Message from Rust: {}", message);

    let webview = app.get_webview_window("main").unwrap();

    let code = format!("console.log('Message from Rust: {message}')");

    webview.eval(code)?;

    Ok(())
}

#[tauri::command]
fn greet(name: &str) -> Result<String> {
    Ok(format!("Hello, {}! You've been greeted from Rust!", name))
}

// TODO some function for fs

//mobile entry point must have 0 arguments
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    create_app(tauri::Builder::default().setup(|app| {
        let a = app.handle();

        log(&a, "hello from Rust");

        let data_dir = app
            .path()
            .app_data_dir()
            .expect("App Data Directory is required to run this application.");

        log(
            &app.handle(),
            data_dir.clone().into_os_string().to_str().unwrap(),
        );

        if !data_dir.exists() {
            log(&app.handle(), "does not exist");

            match std::fs::create_dir_all(&data_dir) {
                Ok(_) => (),
                Err(e) => log(&app.handle(), &e.to_string())?,
            };
        }

        app.manage(data_dir);

        Ok(())
    }))
    .run(|_app_handle, event| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}

pub fn create_app<R: tauri::Runtime>(builder: tauri::Builder<R>) -> tauri::App<R> {
    builder
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![greet,])
        .build(tauri::generate_context!())
        .expect("error while running the application")
}
