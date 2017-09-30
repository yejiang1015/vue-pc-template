module.exports = {
  // extends: 'airbnb',
  plugins: [
    'html',
    'import'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  // 指定解析器
  parser: 'babel-eslint',
  rules: {
    // 使用两个空格进行缩进
    indent: [2, 2],
    // 除需要转义的情况外，字符串统一使用单引号, default(double)
    quotes: [2, 'single'],
    // 不要定义未使用的变量
    'no-unused-vars': 2,
    // 关键字后面加空格
    'keyword-spacing': 2,
    // 函数声明时括号与函数名间加空格
    'space-before-function-paren': 0,
    // 始终使用 === 替代 ==
    eqeqeq: 2,
    // 字符串拼接操作符 (Infix operators) 之间要留空格
    'space-infix-ops': 2,
    // 逗号后面加空格
    'comma-spacing': 2,
    // else 关键字要与花括号保持在同一行
    'brace-style': 2,
    // 多行 if 语句的的括号不能省
    curly: 2,
    // 不要丢掉异常处理中err参数
    'handle-callback-err': 2,
    // 使用浏览器全局变量时加上 window. 前缀
    'no-undef': 2,
    // 不允许有连续多行空行
    'no-multiple-empty-lines': 2,
    // 对于三元运算符 ? 和 : 与他们所负责的代码处于同一行
    'operator-linebreak': 2,
    // 每个 var 关键字单独声明一个变量
    'one-var': [ 2, 'never' ],
    // 不允许使用 var 声明变量
    'no-var': 2,
    // 条件语句中赋值语句使用括号包起来。这样使得代码更加清晰可读，而不会认为是将条件判断语句的全等号（===）错写成了等号（=）
    'no-cond-assign': 2,
    // 单行代码块两边加空格
    'block-spacing': 2,
    // 对于变量和函数名统一使用驼峰命名法
    'camelcase': 2,
    // 不允许有多余的行末逗号
    'comma-dangle': 2,
    // 始终将逗号置于行末
    'comma-style': 2,
    // 点号操作符须与属性需在同一行
    'dot-location': 2,
    // 文件末尾留一空行
    'eol-last': 2,
    // 函数调用时标识符与括号间不留间隔
    'func-call-spacing': 2,
    // 键值对当中冒号与值之间要留空白
    'key-spacing': 2,
    // 构造函数要以大写字母开头
    'new-cap': 2,
    // 无参的构造函数调用时要带上括号
    'new-parens': 2,
    // 对象中定义了存值器，一定要对应的定义取值器
    'accessor-pairs': 2,
    // 子类的构造器中一定要调用 super
    'constructor-super': 2,
    // 使用数组字面量而不是构造器
    'no-array-constructor': 2,
    // 避免使用 arguments.callee 和 arguments.caller
    'no-caller': 2,
    // 避免对类名重新赋值
    'no-class-assign': 2,
    // 避免修改使用 const 声明的变量
    'no-const-assign': 2,
    // 避免使用常量作为条件表达式的条件（循环语句除外）
    'no-constant-condition': 2,
    // 正则中不要使用控制符
    'no-control-regex': 2,
    // 不要使用 debugger
    'no-debugger': 2,
    // 不要对变量使用 delete 操作
    'no-delete-var': 2,
    // 不要定义冗余的函数参数
    'no-dupe-args': 2,
    // 类中不要定义冗余的属性
    'no-dupe-class-members': 2,
    // 对象字面量中不要定义重复的属性
    'no-dupe-keys': 2,
    // switch 语句中不要定义重复的 case 分支
    'no-duplicate-case': 2,
    // 同一模块有多个导入时一次性写完
    'no-duplicate-imports': 2,
    // 正则中不要使用空字符
    'no-empty-character-class': 2,
    // 不要解构空值
    'no-empty-pattern': 0,
    // 不要使用 eval()
    'no-eval': 2,
    // catch 中不要对错误重新赋值
    'no-ex-assign': 2,
    // 不要扩展原生对象
    'no-extend-native': 2,
    // 避免多余的函数上下文绑定
    'no-extra-bind': 2,
    // 避免不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 不要使用多余的括号包裹函数, default(all)
    'no-extra-parens': [2, 'functions'],
    // switch 一定要使用 break 来将条件分支正常中断
    'no-fallthrough': 2,
    // 不要省去小数点前面的0
    'no-floating-decimal': 2,
    // 避免对声明过的函数重新赋值
    'no-func-assign': 2,
    // 不要对全局只读对象重新赋值
    'no-global-assign': 2,
    // 注意隐式的 eval()
    'no-implied-eval': 2,
    // 嵌套的代码块中禁止再定义函数
    'no-inner-declarations': 2,
    // 不要向 RegExp 构造器传入非法的正则表达式
    'no-invalid-regexp': 2,
    // 不要使用非法的空白符
    'no-irregular-whitespace': 2,
    // 禁止使用 __iterator__
    'no-iterator': 2,
    // 外部变量不要与对象属性重名
    'no-label-var': 2,
    // 不要使用标签语句
    'no-labels': 2,
    // 不要书写不必要的嵌套代码块
    'no-lone-blocks': 2,
    // 不要混合使用空格与制表符作为缩进
    'no-mixed-spaces-and-tabs': 2,
    // 除了缩进，不要使用多个空格
    'no-multi-spaces': 2,
    // 不要使用多行字符串
    'no-multi-str': 2,
    // new 创建对象实例后需要赋值给变量
    'no-new': 2,
    // 禁止使用 Function 构造器
    'no-new-func': 2,
    // 禁止使用 Object 构造器
    'no-new-object': 2,
    // 禁止使用 new require
    'no-new-require': 2,
    // 禁止使用 Symbol 构造器
    'no-new-symbol': 2,
    // 禁止使用原始包装器
    'no-new-wrappers': 2,
    // 不要将全局对象的属性作为函数调用
    'no-obj-calls': 2,
    // 不要使用八进制字面量
    'no-octal': 2,
    // 字符串字面量中也不要使用八进制转义字符
    'no-octal-escape': 2,
    // 使用 __dirname 和 __filename 时尽量避免使用字符串拼接
    'no-path-concat': 2,
    // 使用 getPrototypeOf 来替代 __proto__
    'no-proto': 2,
    // 不要重复声明变量
    'no-redeclare': 2,
    // 正则中避免使用多个空格
    'no-regex-spaces': 2,
    // return 语句中的赋值必需有括号包裹
    'no-return-assign': 2,
    // 避免将变量赋值给自己
    'no-self-assign': 2,
    // 避免将变量与自己进行比较操作
    'no-self-compare': 2,
    // 避免使用逗号操作符
    'no-sequences': 2,
    // 不要随意更改关键字的值
    'no-shadow-restricted-names': 2,
    // 禁止使用稀疏数组（Sparse arrays）
    'no-sparse-arrays': 2,
    // 不要使用制表符
    'no-tabs': 2,
    // 正确使用 ES6 中的字符串模板
    'no-template-curly-in-string': 2,
    // 使用 this 前请确保 super() 已调用
    'no-this-before-super': 2,
    // 用 throw 抛错时，抛出 Error 对象而不是字符串
    'no-throw-literal': 2,
    // 行末不留空格
    'no-trailing-spaces': 2,
    // 不要使用 undefined 来初始化变量
    'no-undef-init': 2,
    // 循环语句中注意更新循环变量
    'no-unmodified-loop-condition': 2,
    // 如果有更好的实现，尽量不要使用三元表达式
    'no-unneeded-ternary': 2,
    // return，throw，continue 和 break 后不要再跟代码
    'no-unreachable': 2,
    // finally 代码块中不要再改变程序执行流程
    'no-unsafe-finally': 2,
    // 关系运算符的左值不要做取反操作
    'no-unsafe-negation': 2,
    // 避免不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 避免使用不必要的计算值作对象属性
    'no-useless-computed-key': 2,
    // 禁止多余的构造器
    'no-useless-constructor': 2,
    // 禁止不必要的转义
    'no-useless-escape': 2,
    // import, export 和解构操作中，禁止赋值到同名变量
    'no-useless-rename': 2,
    // 属性前面不要加空格
    'no-whitespace-before-property': 2,
    // 禁止使用 with
    'no-with': 2,
    // 对象属性换行时注意统一代码风格
    'object-property-newline': 2,
    // 代码块中避免多余留白, default(always)
    'padded-blocks': [2, 'never'],
    // 展开运算符与它的表达式间不要留空白
    'rest-spread-spacing': 2,
    // 遇到分号时空格要后留前不留
    'semi-spacing': 2,
    // 代码块首尾留空格
    'space-before-blocks': 2,
    // 圆括号间不留空格
    'space-in-parens': 2,
    // 一元运算符后面跟一个空格
    'space-unary-ops': 2,
    // 注释首尾留空格
    'spaced-comment': 2,
    // 模板字符串中变量前后不加空格
    'template-curly-spacing': 2,
    // 检查 NaN 的正确姿势是使用 isNaN()
    'use-isnan': 2,
    // 用合法的字符串跟 typeof 进行比较操作
    'valid-typeof': 2,
    // 自调用匿名函数 (IIFEs) 使用括号包裹
    'wrap-iife': 2,
    // yield * 中的 * 前后都要有空格
    'yield-star-spacing': 2,
    // 请书写优雅的条件语句（avoid Yoda conditions）
    yoda: 2,

    // 分号
    // semi
    semi: 1,
    // 不要使用 (, [, or ` 等作为一行的开始。在没有分号的情况下代码压缩后会导致报错，而坚持这一规范则可避免出错
    'no-unexpected-multiline': 2,
    // 不要定义未使用的变量
    'no-unused-vars': 2,
    // 不要定义未使用的变量
    'no-unused-vars': 2,
    // 不要定义未使用的变量
    'no-unused-vars': 2,
  },
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      },
    }
  },
  // 指定全局变量
  globals: {
    window: true,
    wx: true,
    process: true,
    console: true,
    require: true,
    Promise: true,
  }
};
