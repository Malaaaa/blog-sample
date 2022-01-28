# Flutter Route Management

Route in mobile development usually refers to a Page, which is the same as the concept of Route in web development for single page applications. The route management in Flutter is similar to the native development, both Android and iOS, the navigation management will maintain a route stack, the route into the stack (push) operation corresponds to open a new page, the route out of the stack (pop) operation corresponds to the page close operation, and the route management is mainly refers to how to manage the route stack.

New routing is the same level as homepage, and is a new stateless component

```dart
class NewRoute extends StatelessWidget 
``` The

The Botton component calls the

```dart
         onPressed: () {
          // Navigate to the new route   
          Navigator.push( context,
           MaterialPageRoute(builder: (context) {
              return NewRoute();
           }));
```

## MaterialPageRoute

The `MaterialPageRoute` class inherits from the `PageRoute` class. The `PageRoute` class is an abstract class that represents a modal route page that occupies the entire screen space, and it also defines the interface and properties related to route construction and transition animations when switching. `MaterialPageRoute` is a component provided by the Material component library, which can achieve the same style of routing switching animation as the platform page switching animation for different platforms.

- For Android, when opening a new page, the new page will slide from the bottom to the top of the screen; when closing a page, the current page will slide from the top to the bottom of the screen and disappear, while the previous page will be displayed on the screen.
- For iOS, when opening a page, the new page will slide consistently from the right edge of the screen to the left side of the screen until the new page is all displayed on the screen, while the previous page will disappear by sliding from the current screen to the left side of the screen; when closing a page, it is just the opposite, the current page will slide out from the right side of the screen, while the previous page will slide in from the left side of the screen.

Here we introduce the meaning of each parameter of the ``MaterialPageRoute`` constructor.

```dart
  MaterialPageRoute({
    WidgetBuilder builder,
    RouteSettings settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
  })
```

- `builder` is a callback function of type WidgetBuilder, which is used to build the specifics of the route page, the return value is a widget. we usually have to implement this callback to return an instance of the new route.
- `settings` contains the configuration information of the route, such as the route name, whether the initial route (home page).
- `maintainState`: by default, when a new route is stacked, the original route is still stored in memory, if you want to release all the resources occupied by the route when it is not used, you can set `maintainState` to false.
- `fullscreenDialog` indicates whether the new routing page is a full-screen modal dialog. In iOS, if `fullscreenDialog` is `true`, the new page will slide in from the bottom of the screen (instead of horizontally).

> If you want to customize the routing switch animation, you can inherit PageRoute to implement it yourself, and we will implement a custom routing component later when we introduce the animation.

## Navigator

`Navigator` is a route management component that provides methods to open and exit route pages. `Navigator` manages a collection of active routes through a stack. Usually the page currently displayed on the screen is the route at the top of the stack. `Navigator` provides a series of methods to manage the routing stack, here we only describe its two most commonly used methods.

### Future push(BuildContext context, Route route)

The return value is a `Future` object that receives the return data when the new route leaves the stack (i.e. is closed).

### bool pop(BuildContext context, [ result ])

Route the top of the stack out of the stack, `result` is the data returned to the previous page when the page is closed.

`Navigator` has many other methods, such as `Navigator.replace`, `Navigator.popUntil`, etc. Please refer to the API documentation or SDK source code comments for details, so we will not repeat them here. Here we also need to introduce another concept related to routing, "named routes".

### Instance methods

Navigator class **static methods** with context as the first parameter correspond to a Navigator **instance method**, for example `Navigator.push(BuildContext context, Route route)` is equivalent to `Navigator.of( context).push(Route route)` , and the following named route-related methods are the same.

## Route Passing

Very often, we need to take some parameters when routing jumps, for example, when opening the product details page, we need to take a product id, so that the product details page to know which product information to display; another example is that we need to select the delivery address when filling an order, after opening the address selection page and selecting the address, you can return the user-selected address to the order page and so on. The following is a simple example to demonstrate how to pass the old and new routes.

### Example

We create a `TipRoute` route, which accepts a prompt text parameter and is responsible for displaying the text passed to it on the page, in addition to the `TipRoute` we add a "Back" button, which when clicked will take a return parameter while returning to the previous route, let's look at the implementation code.

`TipRoute` implementation code.

```dart
class TipRoute extends StatelessWidget {
  TipRoute({
    Key key,
    @required this.text, // receive a text parameter
  }) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Tip"),
      ),
      body: Padding(
        padding: EdgeInsets.all(18),
        child: Center(
          child: Column(
            children: <Widget>[
              Text(text),
              RaisedButton(
                onPressed: () => Navigator.pop(context, "I am the return value"),
                child: Text("return"),
              )
            ],
          ),
        ),
      ),
    );
  }
}
```

Here is the code to open the new routing ``TipRoute``.

```dart
class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: () async {
          // Open `TipRoute` and wait for the return result
          var result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) {
                return TipRoute(
                  // Route parameters
                  text: "I am tip xxxx",
                );
              },
            ),
          );
          //output `TipRoute` route return result
          print("Route return value: $result");
        },
        child: Text("Open prompt page"),
      ),
    );
  }
}
```

Run the above code and click the "Open Tip Page" button on the `RouterTestRoute` page, which will open the `TipRoute` page and run as shown in Figure 2-4 below.

! [Figure 2-4](https://pcdn.flutterchina.club/imgs/2-4.png)

Note: 1.

1. the prompt text "I am prompting xxxx" is passed to the new routing page via the `text` parameter of `TipRoute`. We can wait for the `Future` returned by `Navigator.push(...)` to get the return data of the new route. 2.

2. In the `TipRoute` page, there are two ways to go back to the previous page; the first way is to click the back arrow in the navigation bar directly, and the second way is to click the "Back" button in the page. The difference between these two return methods is that the former does not return data to the previous route, while the latter does. The following is the output of the `print` method in the `RouterTestRoute` page on the console after clicking the back button and the navigation bar return arrow respectively.

   ```
   I/flutter (27896): route return value: I am the return value
   I/flutter (27896): route return value: null
   ```

The above describes the way to pass values for non-named routes. The way to pass values for named routes will be different, and we will cover it when we introduce named routes below.

## Named routes
 