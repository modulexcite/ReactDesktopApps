# React Desktop Apps

React Desktop Apps lets you take advantage the adaptiveness, navigation and deep-linking benefits of a 
Web-based UI, the productivity and responsiveness of the 
[React framework](https://facebook.github.io/react/),
the performance, depth of features and functionality in 
[ServiceStack Libraries](https://servicestack.net/download) and .NET Framework combined with the rich 
native experience and OS Integration possible from a Native Desktop App - all in a single VS .NET template.

![React Desktop Apps](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/gap/react-desktop-splash.png)

The new **React Desktop Apps** template in 
[ServiceStackVS](https://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7) 
provides everything you need to package your ASP.NET ServiceStack Web App into a native Windows Winforms App, 
OSX Cocoa Desktop App or cross-platform (Windows/OSX/Linux) "headless" Console App which instead of being 
embedded inside a Native UI, launches the Users prefered Web Browser for its Web UI.

This Hybrid model of developing Desktop Apps with modern WebKit technologies offers a more productive and 
reusable alternative to developing bespoke WPF Apps in XAML or Cocoa OSX Apps with Xcode. 
It enables full code reuse of the Web App whilst still allowing for platform specific .js, .css and 
C# specialization when needed. These advantages are also why GitHub also adopted a similar approach for 
their new cross-platform UI in their flagship 
[Windows and OSX Desktop Apps](http://githubengineering.com/cross-platform-ui-in-github-desktop/).

### Single Installer-less Executable

Each application is compiled into a single executable that's xcopy-able and runnable directly without a 
Software install. The only pre-requisite is the .NET 4.5 Framework on Windows
(pre-installed on recent versions of Windows) or 
[Mono on Linux](http://www.mono-project.com/docs/getting-started/install/linux/). 
The OSX Cocoa Xamarin.Mac App has the option to bundle the Mono runtime alleviating the need for users to
have an existing install of Mono.

### React Desktop App VS.NET Template

The **React Desktop Apps** template is pre-configured with the necessary tools to package your Web Application 
into multiple platforms using the provided Grunt build tasks. The Desktop Apps are also debuggable
allowing for a simplified and iterative dev workflow by running the preferred Host Project:

- **Web** - ASP.NET Web Application
- **Windows** - Native Windows application embedded in a CefSharp Chromium browser
- **OSX** - Native OS X Cocoa App embedded in a WebView control (requires Xamarin.Mac)
- **Console** - Single portable, cross platform executable that launches the user's prefered browser

## Project Structure

The resulting project structure is the same as the 
[React App](https://github.com/ServiceStackApps/Chat-React#modern-reactjs-apps-with-net) VS.NET Template, 
but with 3 additional projects for hosting the new Desktop and Console Apps and a Common **Resources** project
shared by all Host projects containing all the ASP.NET resources (e.g. .css, .js, images, etc) as embedded
resources. It's kept in-sync with the primary **DefaultApp** project with the `01-bundle-all` or `default` 
Grunt tasks.

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/react-desktop-apps/combined-project-structure.png)

### DefaultApp.sln 

- **DefaultApp** - Web applicaton which contains all our resources and files used while developing.
- **DefaultApp.AppConsole** - Console Host Project
- **DefaultApp.AppWinForms** - WinForms Host Project
- **DefaultApp.Resources** - Shared Embedded resources sourced from **DefaultApp** 
- **DefaultApp.ServiceInterface** - ServiceStack Service Implementations
- **DefaultApp.ServiceModel** - Request and Response DTO's
- **DefaultApp.Tests** - NUnit tests

### DefaultAppMac.sln    

 - **DefaultApp.AppMac** - Cocoa OSX Host project

This is a Xamarin Studio project which can be built with Xamarin.Mac and uses the compiled embedded resources
`lib\DefaultApp.Resources.dll` created by the Grunt task.

### DefaultApp Project

This project contains all our development resources, JS/JSX, CSS, images, Razor views, etc. This project also has all the required Grunt/Gulp tasks used for deploying the 3 application outputs. Taking advantage of Visual Studio 2015's Task Runner Explorer, we can look at the `Alias` tasks to get an idea of how we can build and deploy our console, winforms and web application.

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/gap/react-desktop-tasks.png)

- **default** - grunt task builds and packages both the console and winforms projects by running `02-package-console` and `03-package-winforms`.
- [**01-bundle-all**](#01-bundle-all) - bundles all the application resources into the `Resources` project and into `wwwroot` to stage the web application for deployment
- [**02-package-console**](#02-package-console) - bundles and packages the console application and produces the result in `wwwroot_build\apps` directory.
- [**03-package-winforms**](#03-package-winforms) - bundles and packages the winforms application and produces the result in `wwwroot_build\apps` directory.
- [**04-deploy-webapp**](#04-deploy-webapp) - bundles, packages and deploys the web application using the `wwwroot_build\publish\config.json` file settings and webdeploy to your existing IIS server.

This project also has includes ILMerge and 7zip tools to help package the console and winforms application ready for release. The `wwwroot_build` folder contains the following structure.

The `/wwwroot_build` folder contains the necessary files required for deployments including:

```
/wwwroot_build
  /apps                       # output directory of console and winforms applications
  /deploy                     # copies all files in folder to /wwwroot
    appsettings.txt           # production appsettings to override dev defaults
  /publish                    
    config.json               # deployment config for WebDeploy deployments
  /tools                      # deployment tools for console and winforms applications
    7za.exe                   # 7zip console for packaging
    7zsd_All.sfx	          # 7zip Self Extract module used for bundling winforms app to self executing zip
    ILMerge.exe			      # ILMerge to merge console app output into single binary
  00-install-dependencies     # runs NPM install and bower install, used when getting started after cloning application
  config-winforms.txt         # 7zip SFX config for self executing zip
  package-deploy-console.bat  # runs ILMerge to package the console application
  package-deploy-winforms     # stagings winforms app and packages using 7zip SFX and config-winforms.txt
```

The minimum steps to deploy an app is to fill in `config.json` with the remote IIS WebSite settings as well as a UserName and Password of a User that has permission to remote deploy an app:

```json
{
    "iisApp": "AppName",
    "serverAddress": "deploy-server.example.com",
    "userName": "{WebDeployUserName}",
    "password" : "{WebDeployPassword}"
}
```

#### DefaultApp.AppConsole
This project is for producing a SelfHost ServiceStack application that utilizes the user's default browser. Combined with the Grunt/Gulp and ILMerge, we can produce a cross-platform, single executable that has embedded resources used by our application.

This project uses the bundled resources from the web application that are bundled using the Grunt/Gulp tasks. These resources are embedded in the `DefaultApp.Resources` and the AppHost needs to be configured to look for these embedded resources. For the compiled Razor views, we use the following configuration for our `RazorFormat` plugin.

``` csharp
Plugins.Add(new RazorFormat {
    LoadFromAssemblies = { typeof(CefResources).Assembly }
});
```

`CefResources` is a class in the `DefaultApp.Resources` project so we can easily refer to it's assembly with `typeof(CefResources).Assembly`. 

For our other resources, we need to set the `EmbeddedResourceBaseTypes` to both our current project and the `DefaultApp.Resources` using the `CefResources` type.

```
SetConfig(new HostConfig {
    EmbeddedResourceBaseTypes = { typeof(AppHost), typeof(CefResources) }
});
```

>We need to specify base types instead of assemblies so their namespaces are preserved once they're ILMerged into a single .exe

#### DefaultApp.AppWinForms
This project utilizes the CefSharp project for embedding a high performing Chromium browser in a WinForms application. This project, also uses the bundled resources from the web application via the `DefaultApp.Resources` project as well being a `AppSelfHostBase` based application, we need to set the same config as our `DefaultApp.AppConsole` application in the AppHost.

```csharp
Plugins.Add(new RazorFormat {
    LoadFromAssemblies = { typeof(CefResources).Assembly }
});

SetConfig(new HostConfig {
    EmbeddedResourceBaseTypes = { typeof(AppHost), typeof(CefResources) }
});
```

To embed the Chromium web browser, we reference the `CefSharp.WinForms` project and instantiate a `ChromiumWebBrowser` specifying the applications URL, in this case `http://localhost:1337/`. When using `CefSharp.WinForms` reference, `ChromiumWebBrowser` is a WinForms control that is added to our Form. We also bind `FormClosing`, `FormClosed` and `Load` WinForms events to give the application more of a native feel.

```csharp
public FormMain()
{
    InitializeComponent();
    VerticalScroll.Visible = false;
    ChromiumBrowser = new ChromiumWebBrowser(Program.HostUrl)
    {
        Dock = DockStyle.Fill
    };
    Controls.Add(ChromiumBrowser);

    Load += (sender, args) =>
    {
        Left = Top = 0;
        Width = Screen.PrimaryScreen.WorkingArea.Width;
        Height = Screen.PrimaryScreen.WorkingArea.Height;
    };

    FormClosing += (sender, args) =>
    {
        //Make closing feel more responsive.
        Visible = false;
    };

    FormClosed += (sender, args) =>
    {
        Cef.Shutdown();
    };

    ChromiumBrowser.RegisterJsObject("nativeHost", new NativeHost(this));
}
```

CefSharp also enabled integration between JavaScript and native calls via exposing JavaScript objects that are registered .NET classes. In DefaultApp and the ServiceStackVS template, we wire up 2 objects to show how this can be leveraged. One to simply show a message box when "About" is clicked and the other to close the application. The .NET classes are POCOs that have matching function names with the JavaScript object registered. The default setting is to camel case the JS object following the common naming conventions when using JS.

```csharp
public class NativeHost
{
    private readonly FormMain formMain;

    public NativeHost(FormMain formMain)
    {
        this.formMain = formMain;
        //Enable Chrome Dev Tools when debugging WinForms
#if DEBUG
        formMain.ChromiumBrowser.KeyboardHandler = new KeyboardHandler();
#endif
    }

    public string Platform
    {
        get { return "winforms"; }
    }

    public void ShowAbout()
    {
        MessageBox.Show(@"ServiceStack with CefSharp + ReactJS", @"DefaultApp.AppWinForms", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }

    public void ToggleFormBorder()
    {
        formMain.InvokeOnUiThreadIfRequired(() =>
        {
            formMain.FormBorderStyle = formMain.FormBorderStyle == FormBorderStyle.None
                ? FormBorderStyle.Sizable
                : FormBorderStyle.None;
            formMain.Left = formMain.Top = 0;
            formMain.Width = Screen.PrimaryScreen.WorkingArea.Width;
            formMain.Height = Screen.PrimaryScreen.WorkingArea.Height;
        });
    }
...
```

The `NativeHost` class is exposed by CefSharp as a JavaScript object with functions and properties. The `NativeHost` object is common on all platforms, but the implementation is different to get access to native functionality. CefSharp provides the `nativeHost` JavaScript object, but for other platforms, we need to provide the `nativeHost` JavaScript object via Razor. We use Razor to inject a `PlatformCss` and `PlatformJs` so we can introduce native hooks and presentation into native applications and hide them from our web app.
```html
@if (AppSettings.Exists("PlatformCss"))
{
    <link rel="stylesheet" href="@(AppSettings.GetString("PlatformCss") + "?disableCache=" + DateTime.UtcNow.Ticks)"/>
}
@if (AppSettings.Exists("PlatformJs"))
{
    <script src="@(AppSettings.GetString("PlatformJs") + "?disableCache=" + DateTime.UtcNow.Ticks)"></script>
}
``` 

For example, for the OSX platform, we include a `mac.js` embedded resource that provides the same interfaces, but we use a ServiceStack service to fire functions on the native platform.

```javascript
window.nativeHost = {
    quit: function () {
        $.get('/nativehost/quit');
    },
    showAbout: function () {
    	$.get('/nativehost/showAbout');
    },
    ready: function () {
        //
    },
    platform: 'mac'
}
```

If CefSharp is being used, these objects are registered before page is rendered and the native hooks will be used instead.

#### DefaultApp.Resources
This project has references to the output files from the `01-bundle-all` Grunt task. If any additional images or minified JS/CSS files are added to your project, they must be referenced by this project to be included as an embedded resource for use in both AppConsole and AppWinForms projects. The structure of the project follows what is deployed in the `wwwroot` project.

```
/wwwroot
  /css
    app.min.css
  /img              #  all application images
  /js
    app.jsx.js
  /lib
    /css            # 3rd party css, eg bootstrap
    /fonts          # 3rd party fonts
    /js             # 3rd party minified JS
      bootstrap.min.js
      jquery.min.js
      modernizr.min.js
      react.min.js
      reflux.min.js
  default.cshtml
```

All files have a `Build Action` of `Embedded Resource` so they are ready to be used from AppConsole and AppWinForms.

![](https://github.com/ServiceStack/Assets/raw/master/img/servicestackvs/react-desktop-apps-embedded-resource.png)

## Grunt Tasks
Grunt and Gulp are used in the DefaultApp project to automate our bundling, packaging and deployment of the applications. These tasks are declared as small, single responsibility Grunt tasks and then orchastrated using Alias tasks to be able to run these simply either from Visual Studio using the Task Runner Explorer or from the command line.

#### 01-bundle-all
Just like the AngularJS and React App template, we stage our application ready for release and avoid any build steps at development time to improve the simplicity and speed of the development workflow. This alias task is made up of small, simple tasks that use Gulp to process resources and perform tasks like minification, JSX transformation, copying/deleting of resources, etc.

The bundling searches for assets in any `*.cshtml` file and follows build comments to minify and replace references. This enables simple use of debug JS files whilst still having control how our resources minify.

```html
<!-- build:js lib/js/react.min.js -->
<script src="bower_components/react/react.js"></script>
<!-- endbuild -->
<!-- build:js lib/js/reflux.min.js -->
<script src="bower_components/reflux/dist/reflux.js"></script>
<!-- endbuild -->
<!-- build:remove -->
<script src="bower_components/react/JSXTransformer.js"></script>
<!-- endbuild -->

<!-- build:js js/app.jsx.js -->
<script type="text/javascript" src="js/components/Actions.js"></script>
<script type="text/jsx" src="js/components/User.jsx"></script>
<script type="text/jsx" src="js/components/Header.jsx"></script>
<script type="text/jsx" src="js/components/Sidebar.jsx"></script>
<script type="text/jsx" src="js/components/ChatLog.jsx"></script>
<script type="text/jsx" src="js/components/Footer.jsx"></script>
<script type="text/jsx" src="js/components/ChatApp.jsx"></script>
<!-- endbuild -->
```

When creating new JS files for your application, they should be added in the `build:js js/app.jsx.js` comments shown above. `build:remove` is used to remove the use of the runtime JSX transformer that we use for our React components, but is not longer needed ([and recommended not to be used in a production environment](https://facebook.github.io/react/docs/tooling-integration.html)) in our deployed application.

#### 02-package-console
This task also performs `01-build-all` as well restoring NuGet packages and building the **AppConsole** project. Once the project resources are ready, it calls the `package-deploy-console.bat` batch file which, using **ILMerge**, produces the stand alone exe of the console application and copies it to `apps` output directory.

```bat
IF EXIST staging-console (
RMDIR /S /Q .\staging-console
)

MD staging-console

SET TOOLS=.\tools
SET OUTPUTNAME=DefaultApp.Console.exe
SET ILMERGE=%TOOLS%\ILMerge.exe
SET RELEASE=..\..\DefaultApp.AppConsole\bin\x86\Release
SET INPUT=%RELEASE%\DefaultApp.AppConsole.exe
SET INPUT=%INPUT% %RELEASE%\DefaultApp.Resources.dll
SET INPUT=%INPUT% %RELEASE%\DefaultApp.ServiceInterface.dll
SET INPUT=%INPUT% %RELEASE%\DefaultApp.ServiceModel.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Text.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Client.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Common.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Interfaces.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Server.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.OrmLite.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Redis.dll
SET INPUT=%INPUT% %RELEASE%\ServiceStack.Razor.dll
SET INPUT=%INPUT% %RELEASE%\System.Web.Razor.dll

%ILMERGE% /target:exe /targetplatform:v4,"C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5" /out:staging-console\%OUTPUTNAME% /ndebug %INPUT% 

IF NOT EXIST apps (
MD apps
)

COPY /Y .\staging-console\%OUTPUTNAME% .\apps\DefaultApp-console.exe
```

#### 03-package-winforms
This task also performs `01-build-all` as well restoring NuGet packages and building the **AppWinForms** project. Once the project resources are ready, it calls `package-deploy-winforms.bat` which uses 7zip SFX to zip and compresses the CefSharp.WinForms DefaultApp.AppWinForms application in a self executing zip package.

```bat
IF EXIST staging-winforms\ (
RMDIR /S /Q .\staging-winforms
)

MKDIR staging-winforms

SET TOOLS=.\tools
SET RELEASE=..\..\DefaultApp.AppWinForms\bin\x86\Release
COPY %RELEASE%\DefaultApp.AppWinForms.exe .\staging-winforms
COPY %RELEASE%\DefaultApp.AppWinForms.exe.config .\staging-winforms
COPY %RELEASE%\CefSharp.BrowserSubprocess.exe .\staging-winforms
ROBOCOPY "%RELEASE%" ".\staging-winforms" *.dll *.pak *.dat /E

IF NOT EXIST apps (
mkdir apps
)

IF EXIST DefaultApp-winforms.7z (
del DefaultApp-winforms.7z
)

IF EXIST DefaultApp-winforms.exe (
del DefaultApp-winforms.exe
)

cd tools && 7za a ..\DefaultApp-winforms.7z ..\staging-winforms\* && cd..
copy /b .\tools\7zsd_All.sfx + config-winforms.txt + DefaultApp-winforms.7z .\apps\DefaultApp-winforms.exe
```

If additional files not included in the `ROBOCOPY`/`COPY` commands below are needed in the application, they need to be included in the `ROBOCOPY` command in `package-deploy-winforms.bat`. By default, all the files required for the Chromium Embedded Framework are included in the template script.

```batch
COPY %RELEASE%\DefaultApp.AppWinForms.exe .\staging-winforms
COPY %RELEASE%\DefaultApp.AppWinForms.exe.config .\staging-winforms
ROBOCOPY "%RELEASE%" ".\staging-winforms" *.dll *.pak *.dat /E
```

Once all the required files in are staged in the `staging-winforms`, this directory's contents gets zipped into a `.7z` compressed file, then packaged into a self executing zip using the `config-winforms.txt` file. 

``` txt
;!@Install@!UTF-8!
ExecuteFile="DefaultApp.AppWinForms.exe"
GUIMode="2"
;!@InstallEnd@!
```
Configuration options for 7z SFX can be found in the [7z SFX documentation](http://7zsfx.info/en/configinfo.html).

The DefaultAppApp solution is using a modified version of the 7zsd_All.sfx file which generates the self executable with the custom ServiceStack `.ico` file. More information on how to change this to a custom icon can be found on the [7zsfx.info](http://7zsfx.info/en/icon.html) site.

#### 04-deploy-webapp

This Grunt task uses the same conventions as those found in the AngularJS and ReactApp template in ServiceStackVS. WebDeploy is used to deploy the application from the staged `wwwroot` folder to an existing IIS application. Config for the deployment, eg the IIS Server address, application name, username and password is located in the `/wwwroot_build/publish/config.js`. 

    {
        "iisApp": "YourAppName",
        "serverAddress": "deploy-server.example.com",
        "userName": "{WebDeployUserName}",
        "password" : "{WebDeployPassword}"
    }

If you are using **Github's default Visual Studio ignore, this file will not be included in source control** due to the default rule of `publish/` to be ignored. You should check your Git Repository `.gitignore` rules before committing any potentially sensitive information into public source control.

This task shows a quick way of updating your development server quickly after making changes to your application. For more information on use web-deploy using either Grunt or just Visual Studio publish, see '[WebDeploy with AWS](https://github.com/ServiceStack/ServiceStack/wiki/WebDeploy-with-AWS#deploy-using-grunt)'.

### Design-time only resources

Gulp also supports design-time vs run-time dependencies with the `build:remove` task which can be used to remove any unnecessary dependencies not required in production like react's `JSXTransformer.js`:

```html
<!-- build:remove -->
<script src="bower_components/react/JSXTransformer.js"></script>
<!-- endbuild -->
```

React's `JSXTransformer.js` is what enables the optimal experience of letting you directly reference `.jsx` files in HTML as if they were normal `.js` files by transpiling and executing `.jsx` files directly in the browser at runtime - avoiding the need for any manual pre-compilation steps and retaining the fast `F5` reload cycle that we've come to expect from editing `.js` files. 

```html
<!-- build:js js/app.jsx.js -->
<script type="text/jsx" src="js/components/Actions.js"></script>
<script type="text/jsx" src="js/components/User.jsx"></script>
<script type="text/jsx" src="js/components/Header.jsx"></script>
<script type="text/jsx" src="js/components/Sidebar.jsx"></script>
<script type="text/jsx" src="js/components/ChatLog.jsx"></script>
<script type="text/jsx" src="js/components/Footer.jsx"></script>
<script type="text/jsx" src="js/components/ChatApp.jsx"></script>
<!-- endbuild -->
```

Then when the client app is packaged, all `.jsx` files are compiled and minified into a single `/js/app.jsx.js` with the reference to `JSXTransformer.js` also stripped from the optimized HTML page as there's no longer any need to transpile and execute `.jsx` files at runtime.

**For more info on working with React, see the [Chat-React project](https://github.com/ServiceStackApps/Chat-React#introducing-reactjs) documentation.** 


