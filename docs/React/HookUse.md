##  Hook Usage Breif  Summary

### useState

Lazy initial state, change state will trigger render()

Hook internally uses Object.is to compare whether the new/old states are equal.

### useEffect

Executed after the first render and after each update.

useEffect = **componentDidMounted** + **componentWillUnmount** + **componentDidUpdate**

​				= useEffect(() => void, []);    +    useEffect(() => fn, []);     +  useEffect(() => {}, [dev1]);

### useReducer

Requires multiple uses of useState.

### useContext

Components at different levels need to access the same amount of data.

### useCallback 

Inside the component, methods that will become dependencies on other useEffects are recommended to be wrapped in useCallback, or written directly in the useEffect that references it This is usually the case with functions such as reset and so on, and possibly multiple places where this function is called.
If your function will be passed to the child component as props, be sure to use the useCallback wrapper. For the child component, it can be very annoying if each render causes the function you pass to change. Also not good for react to do rendering optimization.

### useMemo

Some calculations have a lot of overhead, so we need to "remember" the return value to avoid re-calculating it every time we render.
We also need to "remember" the value when the downstream component is re-rendered due to a change in the reference of the value.

### useRef

The ref object returned by useRef remains the same for the lifetime of the component, meaning that the ref object returned is the same each time the function component is re-rendered (with React.createRef, the ref is recreated each time the component is re-rendered). Conceptually, you can think of refs as being like instance variables of a class.

### forwardRef

Because function components do not have instances, function components cannot receive ref attributes like class components. In order to make function components accept ref attributes like class components, we need to wrap function components with forwardRef so that function components can accept ref attributes, and the wrapped components will not pass in ref attributes as props.

### useImperativeHandle

Sometimes we want to execute some methods provided by the child component in the parent component. In the class component we can get the child component by ref and then execute the methods in the child component (which is also a class component), but in the function component we can't do that. Because there is no this in the function component, we can't get the methods in the function's subcomponents. At this point we can use useImperativeHandle with forwardRef

### useLayoutEffect

The function signature is the same as useEffect, but it calls effect synchronously after all DOM changes. you can use it to read the DOM layout and trigger re-rendering synchronously. The update schedule inside useLayoutEffect will be refreshed synchronously before the browser performs the drawing







