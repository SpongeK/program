var length = 10
function fn(){
    console.log('this', this)
    console.log(this.length)
}
var obj ={
    length: 5,
    method: function(fn){
        console.log('method this', this)
        fn()
        console.log('arguments[0]', arguments[0])
        arguments[0]()
        console.log(arguments, 'arguments')
    }
}

obj.method(fn)
/**
 * 错误想法：
 * method方法中执行fn，调用者为obj，所以fn() ---> 5
 * arguments[0]指向fn方法，获取该方法的入参长度 ---> 0
 * 输出 function {}, arguments
 */
/**
 * 输出实际情况：
 * 无对象显式调用method方法，故调用者为window,，所以fn()中this指向window，fn() ----> 10
 * arguments[0]指向fn方法，arguments[0]() --> arguments.0(), 所以this指向arguments, 故输出method的实参长度 -----> 1
 */
obj.method(fn, 123)
/**
 * 输出 [function{}, 123], agruments 
 */

/* ============================================ */
var a = { n: 1 }
var b = a  // b = { n: 1 }
a = { n: 2 } // a = b = { n: 2 }
a.x = a  // a = { n:2, x: { n: 2} }
console.log(a.x)  // {n:2}

/* ============================================= */
function foo(){
    console.log(a)
}
function bar(){
    var a = 3
    console.log(this.a + a)
    foo()
}
var a = 2
bar()
bar.call({a: 4})
/**
 * 变量、声明提升
 * GO:{
 *   function foo()
 *   function bar()
 *   a ---> undefined
 * }
 * 
 * bar()代码执行
 * GO( window ):{
 *   function foo()
 *   function bar()
 *   a ---> 2
 * }
 * AO( 执行bar() ):{
 *   a ---> 3
 * }
 * bar()被window调用，this指向window，this.a获取GO中的值，自身上下文有a，故使用自己的a(2)，故输出 5
 * foo() ---> 输出 2
 * bar.call({a:4}) 代码执行
 * call更改了this指向，this.a获取{a: 4}中的a，故输出 7
 * foo() 仍然是window调用，输出 2
 */