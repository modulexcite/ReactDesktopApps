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
embedded inside a Native UI, launches the User's prefered Web Browser for its Web UI.

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

## Downloads

#### Windows Winforms App

[DefaultApp-winforms.exe](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-winforms.exe) (23.7 MB)

#### OSX Cocoa App

[DefaultApp.AppMac.app.zip](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp.AppMac.app.zip) (4.1 MB)

#### Console App (Windows/OSX/Linux)

[DefaultApp-console.exe](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-console.exe) (4.8 MB) or [DefaultApp-console.zip](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-console.zip) (1.5 MB)

## Project Structure

The resulting project structure is the same as the 
[React App](https://github.com/ServiceStackApps/Chat-React#modern-reactjs-apps-with-net) VS.NET Template, 
but with 3 additional projects for hosting the new Desktop and Console Apps and a Common **Resources** project
shared by Host projects containing all the ASP.NET resources (e.g. .css, .js, images, etc) as embedded
resources. It's kept in-sync with the primary **DefaultApp** project with the `01-bundle-all` or `default` 
Grunt tasks.

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/react-desktop-apps/combined-project-structure.png)

### DefaultApp.sln 

- **DefaultApp** - Complete Web application, inc. all Web App's .js, .css, images, etc.
- **DefaultApp.AppConsole** - Console Host Project
- **DefaultApp.AppWinForms** - WinForms Host Project
- **DefaultApp.Resources** - Shared Embedded resources sourced from **DefaultApp** 
- **DefaultApp.ServiceInterface** - ServiceStack Service Implementations
- **DefaultApp.ServiceModel** - Request and Response DTO's
- **DefaultApp.Tests** - NUnit tests

### DefaultAppMac.sln    

 - **DefaultApp.AppMac** - OSX Cocoa Host project

This is a Xamarin Studio project which can be built with Xamarin.Mac and uses the compiled embedded resources
`lib\DefaultApp.Resources.dll` created by the **01-bundle-all** Grunt task.

### DefaultApp Project

The primary **DefaultApp** project contains the complete React Web App hosted in an ASP.NET Project. 
It includes `gruntfile.js` which provides the necessary Grunt tasks to bundle and optimize the Wep Application 
ready for deployment as well as Grunt tasks to minify the Web Applications assets and publishes them 
embedded resources into the shared **DefaultApp.Resources** project. This project is how the React WebApp
is made available to the alternative Desktop and Console Apps.

The primary Grunt Tasks you'll use to package and deploy your App are contained in **Alias Tasks** group
which is easily runnable from VS .NET's 
[Task Runner Explorer](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708)
which is built into VS 2015:

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/gap/react-desktop-tasks.png)

- **default** - Runs `01-bundle-all` and creates packages for `02-package-console` and `03-package-winforms`
- [**01-bundle-all**](#01-bundle-all) - optimizes and packages Web App the into `wwwroot` and `Resources` project
- [**02-package-console**](#02-package-console) - Packages the Console App in `wwwroot_build\apps`
- [**03-package-winforms**](#03-package-winforms) - Packages the Winforms App in `wwwroot_build\apps`
- [**04-deploy-webapp**](#04-deploy-webapp) - deploys the Web App in `wwwroot` with MS WebDeploy to any IIS Server using config `wwwroot_build\publish\config.json`

The template also includes the **ILMerge** tool to merge all .NET .dlls (inc. Resources.dll) into a single,
cross-platform Console Application .exe that's runnable as-is on any Windows, OSX or Linux server with .NET
or Mono pre-installed. 

Downloads for the Default Template Console App:

#### [DefaultApp-console.exe](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-console.exe) (4.8MB) or [DefaultApp-console.zip](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-console.zip) (1.5MB)

Since the Winforms requires CefSharp's native Chromium .dlls it can't be ILMerged, instead we use 7Zip's SFX 
utility to package the Winforms application into a single self-extracting executable that like the Console App 
is also installer-less and can be xcopied and runnable as-is. 

Download for the Default Template Winforms App: 

#### [DefaultApp-winforms.exe](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp-winforms.exe) (23.7 MB)

To package the OSX App you'll need to open the **DefaultAppMac.sln** in Xamarin.Studio on OSX which packages
the App as on OSX App or Installer. 

Download for the Default Template OSX Cocoa App: 

#### [DefaultApp.AppMac.app.zip](https://github.com/ServiceStackApps/ReactDesktopApps/raw/master/dist/DefaultApp.AppMac.app.zip) (4.1 MB)

### [wwwroot_build](https://github.com/ServiceStackApps/ReactDesktopApps/tree/master/src/DefaultApp/DefaultApp/DefaultApp/wwwroot_build)

The necessary infrastructure for optimizing, packaging the React Web Application is contained in the 
`/wwwroot_build` folder:

```
/wwwroot_build
  /apps                       # directory where Console and Winforms Apps are published
  /deploy                     # copies all files in folder to /wwwroot
    appsettings.txt           # production appsettings to override dev defaults
  /publish                    
    config.json               # deployment config for WebDeploy IIS deployments
  /tools                      # deployment tools for Console and Winforms Apps
    7za.exe                   # 7zip exe
    7zsd_All.sfx	          # 7zip Self Extract utility for bundling Winforms app into a self-extracting exe
    ILMerge.exe			      # ILMerge to merge console app output into single binary
  00-install-dependencies     # runs nom install and bower install, used to download deps after first clone
  config-winforms.txt         # 7zip SFX config for self-extracting Winforms App 
  package-deploy-console.bat  # runs ILMerge to package Console App
  package-deploy-winforms.bat # stagings winforms app and packages using 7zip SFX and config-winforms.txt
```

### Deploying the ASP.NET Web App

To deploy an app you just need to populate `publish/config.json` with the remote IIS WebSite settings 
and UserName/Password of an Account with permission to deploy a Website with MS WebDeploy:

```json
{
    "iisApp": "AppName",
    "serverAddress": "deploy-server.example.com",
    "userName": "{WebDeployUserName}",
    "password" : "{WebDeployPassword}"
}
```

Then run the `04-deploy-webapp` Grunt task to package the optimized React App in `/wwwroot` into a 
`webdeploy.zip` package which it publishes to a remote IIS Web Server using the configuration above.

> If you specify **Visual Studio** settings when creating a repo in GitHub its will ignore the `/publish` 
folder so this sensitive info isn't committed along with the project. If you're publishing to a public repo 
please double-check this config file doesn't get published by ensuring it's specified in your repo's `.gitignore`

## React Web Development

The React Desktop Template is structured for optimal developer productivity, fast iterations, maximum re-use, 
easy customizability and optimal runtime performance driven by a pre-configured automated workflow. 
It also maximizes skill re-use where most development time will be spent developing a normal ASP.NET 
React Web Application without any consideration for the different platforms the template create packages for. 

The template follows the same
[Modern React Apps with .NET](https://github.com/ServiceStackApps/Chat-React#modern-reactjs-apps-with-net)
as ServiceStack's other Single Page App templates which uses node's rich ecosystem to enable access to premier
Web technologies including [bower](http://bower.io/) for client dependencies and pre-configured
[Grunt](http://gruntjs.com) and [Gulp](http://gulpjs.com) tasks to take care of website bundling, optimization,
application packaging and ASP.NET Website deployemnts.

The entire React application is hosted within a single static 
[default.html](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp/default.html)
which is itself only used to structure the websites resources into logical groupings where 3rd Party 
JavaScript libraries and CSS are kept isolated from your Application's source code. The groups are defined
by HTML comments which instruct 
[Gulps userref](https://www.npmjs.com/package/gulp-useref) plugin on how to minify and optimize your 
Apps resources:

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">

    <!--build:css /lib/css/lib.min.css--><!-- 3rd Party css -->
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
    <!-- endbuild -->

    <!--build:css /css/app.min.css-->
    <link rel="stylesheet" href="/css/app.css" /><!-- App css -->
    <!-- endbuild -->

    <link rel="stylesheet" href="/platform.css" /><!-- platform-specific css -->

    <!-- build:js /lib/js/lib.min.js --><!-- 3rd Party Libraries -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <script src="bower_components/modernizr/modernizr.js"></script>
    <script src="bower_components/react/react.js"></script>
    <!-- endbuild -->

    <script src="/js/ss-utils.js"></script><!-- ss-utils in ServiceStack.dll -->
       
    <!-- build:js /js/app.min.js --><!-- App non-UI and static utils, React Stores, etc -->
    <script src="/js/utils.js"></script>
    <!-- endbuild -->

    <script src="/platform.js"></script><!-- platform-specific js -->

    <title>DefaultApp</title>
</head>
<body>
    <!-- build:js /js/app.jsx.js --><!-- App React Components -->
    <script type="text/jsx" src="/js/components/hello.jsx"></script>
    <script type="text/jsx" src="/js/app.jsx"></script>
    <!-- endbuild -->
    
    <!-- build:remove --><!-- Render JSX on-the-fly without pre-compilation -->
    <script src="bower_components/react/JSXTransformer.js"></script>
    <!-- endbuild -->
</body>
</html>
```

For a lot of apps, most of your time will be spent creating the Web UI encapsulated in React Components 
which are maintained in the last group. The `JSXTransformer.js` is only required during development to enable
on-the-fly changes without pre-compilation. It gets removed during bundling as it's no longer needed since
the JSX compiled JavaScript outputs are referenced instead. 

The `01-bundle-all` Grunt task takes care of bundling and copying all resources into the `/wwwroot` folder 
and **DefaultApp.Resources** project, transforming it into the following
[default.html](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp.Resources/default.html):

```html
<!-- Auto generated by DefaultApp\gruntfile.js -->
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">

    <link rel="stylesheet" href="/lib/css/lib.min.css">

    <link rel="stylesheet" href="/css/app.min.css">

    <link rel="stylesheet" href="/platform.css" />

    <script src="/lib/js/lib.min.js"></script>

    <script src="/js/ss-utils.js"></script>
       
    <script src="/js/app.min.js"></script>

    <script src="/platform.js"></script>

    <title>DefaultApp</title>
</head>
<body>
    <script src="/js/app.jsx.js"></script>
</body>
</html>
```


### [DefaultApp.Resources](https://github.com/ServiceStackApps/ReactDesktopApps/tree/master/src/DefaultApp/DefaultApp/DefaultApp.Resources)

By maintaining all functionality within the existing pre-defined groups, no additional config is needed 
since the existing references are already marked as **Embedded Resources** 
allowing the entire Web Application to be embedded inside the .NET **DefaultApp.Resources.dll**.
This is what each of the Desktop and Console Application references to be able to host your Website.

Should you wish to add additional resources outside these pre-defined groups you'll need to 
[ensure they're copied over](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp/gruntfile.js#L4) 
by Grunt and then have their **Build Action** set to `Embedded Resource`.

![](https://github.com/ServiceStack/Assets/raw/master/img/servicestackvs/react-desktop-apps-embedded-resource.png)

For most applications your Application will be optimized into the following layout in both the static
**DefaultApp.Resources** project as well as the optimized ASP.NET Web Application created in `/wwwroot`, 
in preparation for production deployment:

```
/wwwroot
  /css
    app.min.css     # App styles
  /img              # App images
  /js
    app.jsx.js      # App React Components 
    app.min.js      # App non-UI utils
  /lib
    /css
      lib.min.css   # 3rd party css, e.g: Bootstrap
    /fonts          # 3rd party fonts, e.g: Bootstrap
    /js
      lib.min.js    # 3rd party JS, e.g: jQuery, React
  default.html      # App website HTML
```

## Host Projects

The Host projects for each platform are essentially "native application wrappers" around hosting the React 
Website inside different applications. The React App itself is encapsulated within the shared 
`DefaultApp.Resources` project as embedded resources. 

### Platform-specific customizations 

Customizations for each platform is available by modifying the `platform.css` and `project.js` files at the 
base of each project's folder. 

In addition, an easy way to limit which HTML elements are displayed is to use the `platform` class to initially 
hide the element, then specify which platforms it should be displayed in by listing the specific platforms, e.g:

```html
<ul className="nav navbar-nav pull-right">
    <li><a onClick={this.handleAbout}>About</a></li>
    <li className="platform winforms">
        <a onClick={this.handleToggleWindow}>Toggle Window</a>
    </li>
    <li className="platform winforms mac">
        <a onClick={this.handleQuit}>Close</a>
    </li>
</ul>
```

We use this technique to only show the **Toggle Window** Menu Item to the Winforms App and the **Close** Menu
Item to the Winforms and OSX Mac App, i.e. ignoring it in the Console and ASP.NET Web App.

Since each host is just a normal C# project you also have complete freedom in enhancing each platform with 
enhanced functionality specific to that platform. E.g. you can add Services only available to a single platform 
by telling ServiceStack to also register Services contained in the host project by 
[specifying multiple assemblies in the AppHost constructor](https://github.com/ServiceStack/ServiceStack/wiki/Modularizing-services):

```csharp
public class AppHost : AppSelfHostBase
{
    public AppHost()
      : base("DefaultApp Console", typeof(MyServices).Assembly, typeof(AppHost).Assembly)
}
```

### Serving Embedded Resources 

We tell each Host to serve the Embedded Resources in `DefaultApp.Resources` by specifying it in the HostConfig:

```csharp
SetConfig(new HostConfig {
    EmbeddedResourceBaseTypes = { typeof(AppHost), typeof(SharedEmbeddedResources) }
});
```

`SharedEmbeddedResources` is an empty "marker" class in the `DefaultApp.Resources` project which allows us to easily refer 
to it's assembly with `typeof(SharedEmbeddedResources).Assembly`. 

> We need to specify base types to preserve Assembly namespaces after they're ILMerged into a single .exe

### Native Host

We use the `window.nativeHost` API to encapsulate the differences and invoke native functionality available
on each platform. 

#### Web Native Host

When running as a normal ASP.NET Web App these API's just call the browsers DOM:

```js
/* web */
window.nativeHost = {
    quit: function() {
        window.close();
    },
    showAbout: function() {
        alert('DefaultApp - ServiceStack + ReactJS');
    },
    platform: 'web'
};
```

#### Console Native Host

The Console App is similar since it's also viewed in an external browser it isn't able to take advantage of any 
Inter-Process Communications (IPC) and requires an Ajax call to communicate back to the C# Self-Hosting 
Console Application:

```js
/* console */
window.nativeHost = {
    quit: function() {
        $.post('/nativehost/quit')
            .then(function() {
                window.close();
            });
    },
    showAbout: function() {
        alert('ReactChat - ServiceStack + ReactJS');
    },
    platform: 'console'
};
```

Calls to `/nativehost` call the `NativeHostService` below:

```csharp
public class NativeHostAction : IReturnVoid
{
    public string Action { get; set; }
}

public class NativeHostService : Service
{
    public void Any(NativeHostAction request)
    {
        if (string.IsNullOrEmpty(request.Action))
            throw HttpError.NotFound("Function Not Found");

        var nativeHost = typeof(NativeHost).CreateInstance<NativeHost>();
        var methodName = request.Action.Substring(0,1).ToUpper()+request.Action.Substring(1);
        var methodInfo = typeof(NativeHost).GetMethod(methodName);
        if (methodInfo == null)
            throw new HttpError(HttpStatusCode.NotFound, "Function Not Found");

        methodInfo.Invoke(nativeHost, null);
    }
}

public class NativeHost
{
    public void Quit()
    {
        Environment.Exit(0);
    }
}
```

Which just proxies the ajax request and invokes the matching C# method on `NativeHost`, in this case 
`/nativehost/quit` terminates the Console Application.

#### Winforms Native Host

With the Winforms and OSX Native Desktop Applications we instead want to intercept these calls and show
native dialogs and likewise having `/nativehost/quit` close the Desktop application. 

With Winforms we don't need to provide a JavaScript API wrapper since CefSharp provides us with a 
JavaScript interop that lets us to register a C# object and expose it directly as a JavaScript object with:

```csharp
ChromiumBrowser.RegisterJsObject("nativeHost", new NativeHost(this));
```

So our entire `window.nativeHost` API is defined in C#:

```csharp
public class NativeHost
{
    //...
    public void Quit()
    {
        formMain.InvokeOnUiThreadIfRequired(() => {
            formMain.Close();
        });
    }

    public void ShowAbout()
    {
        MessageBox.Show(@"ServiceStack with CefSharp + ReactJS", 
            @"DefaultApp.AppWinForms", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }

    public void ToggleFormBorder()
    {
        formMain.InvokeOnUiThreadIfRequired(() => {
            formMain.FormBorderStyle = formMain.FormBorderStyle == FormBorderStyle.None
                ? FormBorderStyle.Sizable
                : FormBorderStyle.None;
        });
    }
}
```

Which like the JavaScript API's can be invoked from JavaScript, e.g:

```js
nativeHost.showAbout();
```

#### Mac Native Host

Unfortunately whilst the OSX Cocoa App also embeds a WebView control, it doesn't provide an API to register
C# objects directly, so like the Console Application we need to communicate with the containing C# Application
via Ajax requests:

```js
/* mac */
window.nativeHost = {
    quit: function () {
        $.post('/nativehost/quit');
    },
    showAbout: function () {
    	$.post('/nativehost/showAbout');
    },
    platform: 'mac'
};
```

In the Cocoa App it uses a copy of the `NativeHostService` used in the Console App to proxy each call to the
matching method on `NativeHost` which then invokes the required native Cocoa API's:

```csharp
public class NativeHost
{
    public void ShowAbout()
    {
        Program.MainMenu.InvokeOnMainThread (() => {
            foreach (var item in Program.MainMenu.ItemArray()) {
                if (item.Title == "DefaultApp") {
                    item.Submenu.PerformActionForItem(0);
                }
            }
        });
    }

    public void Quit()
    {
        AppDelegate.MainWindowController.InvokeOnMainThread (() => {
            AppDelegate.MainWindowController.Hide();
        });
        Environment.Exit(0);
    }
}
```

### [DefaultApp.AppConsole](https://github.com/ServiceStackApps/ReactDesktopApps/tree/master/src/DefaultApp/DefaultApp/DefaultApp.AppConsole)

This project contains the self-hosting Console App which 
[launches the users prefered browser](https://github.com/ServiceStackApps/ReactDesktopApps/blob/fd6ec97bf0ea850ce0e7596d93f4868e6d2d0a1f/src/DefaultApp/DefaultApp/DefaultApp.AppConsole/Program.cs#L25) 
to render the React Web UI with:

```csharp
static class Program
{
    public static string HostUrl = "http://127.0.0.1:2337/";

    static void Main(string[] args)
    {
        new AppHost().Init().Start("http://*:2337/");
        "ServiceStack SelfHost listening at {0}".Fmt(HostUrl).Print();
        Process.Start(HostUrl);

        Thread.Sleep(Timeout.Infinite);
    }
}
```

### [DefaultApp.AppWinForms](https://github.com/ServiceStackApps/ReactDesktopApps/tree/master/src/DefaultApp/DefaultApp/DefaultApp.AppWinForms)

This project contains the Winforms App that utilizes [CefSharp](https://github.com/cefsharp/CefSharp) 
to embed the fast and modern Chromium browser inside a Windows Application.
 
To embed the Chromium web browser, we instantiate the `ChromiumWebBrowser` and set it to navigate to the 
applications Url to render the React Web UI. The browser control is then fully docked to the containing 
`FormMain` and configured to fill the entire screen:

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

### [DefaultApp.AppMac](https://github.com/ServiceStackApps/ReactDesktopApps/tree/master/src/DefaultApp/DefaultApp/DefaultApp.AppMac)

This project contains the OSX Cocoa Application which requires Xamarin.Mac on OSX to build.

The entry point for the Cocoa Application is in 
[Program.cs](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp.AppMac/Program.cs)
which first starts the self-hosting Service before loading the Cocoa Desktop App:

```csharp
public static class Program
{
    public static string HostUrl = "http://127.0.0.1:3337/";

    public static AppHost App;
    public static NSMenu MainMenu;

    static void Main (string[] args)
    {
        App = new AppHost();
        App.Init().Start("http://*:3337/");

        NSApplication.Init();
        NSApplication.Main(args);
    }
}
```

As-is standard for Cocoa Apps, the UI for each Window is contained in `.xib` files that are created and designed
using Interface Builder. In the `AwakeFromNib()` callback we fully dock the `WebView` to the `MainWindow` and 
set its `MainFrameUrl` to navigate to the Applications Url to render the React Web UI:

```csharp
public partial class MainWindow : MonoMac.AppKit.NSWindow
{
    public override void AwakeFromNib()
    {
        base.AwakeFromNib ();
        Program.MainMenu = NSApplication.SharedApplication.MainMenu;
        webView.MainFrameUrl = Program.HostUrl;
        webView.Frame = new RectangleF(0,0,this.Frame.Width,this.Frame.Height);
        this.DidResize += (sender, e) =>  {
            webView.Frame = new RectangleF(0,0,this.Frame.Width,this.Frame.Height);
        };
    }
}
```

## Grunt Tasks

Grunt and Gulp are used in the DefaultApp project to automate the bundling, packaging and deployment of the 
applications. These tasks are declared as small, composable Grunt tasks that are then orchestrated 
by the high-level Alias tasks which are easily run within Visual Studio using **Task Runner Explorer** or
from the command-line with the `grunt` script.

### 01-bundle-all

Just like the existing AngularJS and React Single Page App templates, we stage our application ready for 
release and avoid any build steps at development time to improve the simplicity and speed of the development 
workflow. This alias task is made up of small, simple tasks that use Gulp to process resources and perform 
tasks like minification, JSX transformation, copying/deleting of resources, etc.

The bundling searches for assets in any `*.html` file and follows build comments to minify and replace 
references. This enables simple use of debug JS files whilst still having control how our resources minify.

```html
<!-- build:js /js/app.min.js --><!-- App non-UI and static utils, React Stores, etc -->
<script src="/js/utils.js"></script>
<!-- endbuild -->

<!-- build:js /js/app.jsx.js --><!-- App React Components -->
<script type="text/jsx" src="/js/components/hello.jsx"></script>
<script type="text/jsx" src="/js/app.jsx"></script>
<!-- endbuild -->
```

When creating new JS files for your application, they should be added in the `build:js /js/app.min.js` or
`build:js js/app.jsx.js` HTML comments shown above.

Should you need to extend the Grunt task to copy additional resources you can specify additional them in
the `COPY_FILES` rules at the top of 
[gruntfile.js](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp/gruntfile.js):

```js
var WEB = 'web';
var NATIVE = 'native';

var COPY_FILES = [
    { src: './bin/**/*', dest: 'bin/', host: WEB },
    { src: './img/**/*', dest: 'img/' },
    { src: './App_Data/**/*', dest: 'App_Data/', host: WEB },
    { src: './Global.asax', host: WEB },
    { src: './bower_components/bootstrap/dist/fonts/*.*', dest: 'lib/fonts/' },
    { src: './platform.js', dest: 'js/', host: WEB },
    { src: './wwwroot_build/deploy/*.*', host: WEB },
    {
        src: './web.config',
        host: [WEB],
        afterReplace: [{
            from: '<compilation debug="true" targetFramework="4.5"',
            to: '<compilation targetFramework="4.5"'
        }]
    }
];
```

You can specify a `host` to copy the resources to either the Web `wwwroot` or the Native `DefaultApp.Resources` 
project, otherwise leave it empty to copy it to both.

### 02-package-console

This task first calls `01-build-all`, restores NuGet packages and builds the **AppConsole** project. 
After the project is built, it calls `package-deploy-console.bat` which uses **ILMerge** to merge 
all Application .dlls into a stand-alone Console application .exe that's copied into the 
`/wwwroot_build/apps` output directory.

If your Console Application requires additional .NET .dlls they'll also need to be listed in 
[package-deploy-console.bat](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp/wwwroot_build/package-deploy-console.bat):

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
SET INPUT=%INPUT% %RELEASE%\System.Web.Razor.dll

%ILMERGE% /target:exe /targetplatform:v4,"C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework\v4.5" /out:staging-console\%OUTPUTNAME% /ndebug %INPUT% 

IF NOT EXIST apps (
MD apps
)

COPY /Y .\staging-console\%OUTPUTNAME% .\apps\DefaultApp-console.exe
```

### 03-package-winforms

This task also performs `01-build-all` as well restoring NuGet packages and building the **AppWinForms** project. 
Once the project resources are ready, it calls `package-deploy-winforms.bat` which uses 7zip SFX to zip and 
compresses the CefSharp.WinForms DefaultApp.AppWinForms application into a single self-extracting executable.

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

If additional files not included in the `ROBOCOPY`/`COPY` commands below are needed in the application, 
they'll need to be included in the `ROBOCOPY` command in 
[package-deploy-winforms.bat](https://github.com/ServiceStackApps/ReactDesktopApps/blob/master/src/DefaultApp/DefaultApp/DefaultApp/wwwroot_build/package-deploy-winforms.bat). 

By default, all the files required for the Chromium Embedded Framework are included in the template script.

```batch
COPY %RELEASE%\DefaultApp.AppWinForms.exe .\staging-winforms
COPY %RELEASE%\DefaultApp.AppWinForms.exe.config .\staging-winforms
ROBOCOPY "%RELEASE%" ".\staging-winforms" *.dll *.pak *.dat /E
```

Once all the required files in are staged in the `staging-winforms`, this directory's contents gets zipped 
into a `.7z` compressed file, then packaged into a self executing zip using the `config-winforms.txt` file. 

``` txt
;!@Install@!UTF-8!
ExecuteFile="DefaultApp.AppWinForms.exe"
GUIMode="2"
;!@InstallEnd@!
```
Configuration options for 7z SFX can be found in the 
[7z SFX documentation](http://7zsfx.info/en/configinfo.html).

The Default App solution is using a modified version of the 7zsd_All.sfx file which generates the 
self executable with the custom ServiceStack `.ico` file. More information on how to change this to a custom 
icon can be found on the [7zsfx.info](http://7zsfx.info/en/icon.html) site.

### 04-deploy-webapp

This Grunt task uses the same conventions as those 
[found in the deploy task](https://github.com/ServiceStack/ServiceStackVS/blob/master/angular-spa.md#04-deploy-app) 
for the AngularJS and ReactApp templates.
 
WebDeploy is used to deploy the application from the staged `wwwroot` folder to an 
existing IIS application. Config for the deployment, eg the IIS Server address, application name, 
username and password is located in the `/wwwroot_build/publish/config.js`. 

    {
        "iisApp": "YourAppName",
        "serverAddress": "deploy-server.example.com",
        "userName": "{WebDeployUserName}",
        "password" : "{WebDeployPassword}"
    }

If you are using **Github's default Visual Studio ignore, this file will not be included in source control** 
due to the default rule of `publish/` to be ignored. You should check your Git Repository `.gitignore` rules 
before committing any potentially sensitive information into public source control.

This task shows a quick way of updating your development server quickly after making changes to your 
application. For more information on use web-deploy using either Grunt or just Visual Studio publish, see 
[WebDeploy with AWS](https://github.com/ServiceStack/ServiceStack/wiki/WebDeploy-with-AWS#deploy-using-grunt).

### Further Reading

For more info on working with React, see the 
[Intro to React docs](https://github.com/ServiceStackApps/Chat-React#introducing-reactjs) on the Chat-React project. 
# Example Apps

## [Redis React](https://github.com/ServiceStackApps/RedisReact)

Redis React is a simple user-friendly UI for browsing data in Redis servers that leverages 
the navigation and deep-linking benefits of a Web-based UI, the productivity and responsiveness of the 
[React framework](http://facebook.github.io/react/) 
and the deep Integration possible from a Native App.

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/redis-react/home.png)](http://redisreact.servicestack.net/#/)

> Downloads for [Windows, OSX, Linux and Web](https://github.com/ServiceStackApps/RedisReact#download)

## [React Chat Desktop](https://github.com/ServiceStackApps/ReactChatApps)

A port of 
[React Chat](https://github.com/ServiceStackApps/Chat-React)
built with the new 
[React Desktop Apps](https://github.com/ServiceStackApps/ReactDesktopApps)
VS.NET template and packaged into a native Desktop App for Windows and OSX.
It takes advantage of 
[Server Events](https://github.com/ServiceStack/ServiceStack/wiki/Server-Events) to enable synchronized 
real-time control of multiple Windows Apps:

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/react-desktop-apps/dancing-windows.png)](https://youtu.be/-9kVqdPbqOM)

> Downloads for [Windows, OSX, Linux and Web](https://github.com/ServiceStackApps/ReactChatApps#downloads)


