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

/* ============ */
var a = { n: 1 }
var b = a  // b = { n: 1 }
a = { n: 2 } // a = b = { n: 2 }
a.x = a  // a = { n:2, x: { n: 2} }
console.log(a.x)  // {n:2}
