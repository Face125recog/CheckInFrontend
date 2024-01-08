# 接口定义

## 类型定义

### 基本类型
| 类型 | 说明 |
| :--: | :--: |
| string | 字符串类型 |
| int | 数字类型,定点数32 |
| float | 数字类型，浮点数64 |

### 辅助类型

- 基本响应体

    ```typescript
    interface Result<T>{
        data?:T,
        errty?:string,
        errmsg?:string
    }
    ```
- 说明
    - 当接口响应成功时，响应荷载置于`data`字段中，`errty` 与 `errmsg`为null或不提供
    - 当接口响应出现问题时，响应书记`data` 为空， 填充`errty` 错误类型 和 `errmsg` 错误信息。并且提供>=400 的响应状态码（Http status code）

## 接口定义

### 打卡部分 `/check_in`

#### 打卡
- 该接口接受一个已经切割好的人脸，和一个最低概率置信度，返回对应人的名字与ID
- 使用方法：POST
- 是否需要管理权限： 否
- 请求体类型：`json`
    - 请求结构 
        ```typescript 
        interface FaceMatch{
            face:string,
            mini_confidence:float
        }
        ```
    - 说明
        - `face`:字段为切割完毕的人脸的的PNG编码图像的base64编码的字符串。
        - `mini_confidence`: 当模型的输出概率小于该最小置信度，将返回人脸匹配错误, 为浮点类型， 范围0.0～1.0
- 响应体荷载：`json`
    - 响应结构
        ```typescript
        interface FaceOwner{
            name:string,
            identity:int
        }
        ```
    - 说明
        - `name` : 对应用户名称
        - `identity`： 用户的唯一标识

### 用户管理 `/admin`

#### 录入用户上下文 `/user-register/context`
- 该接口提供一个字符串来保持录入人脸时的上下文
- 使用方法： POST
- 是否需要管理权限：是
- 请求体类型：无请求体
- 响应体荷载: `string`
    - 说明：返回一个保持上下文的字符串

#### 录入用户 `/user-register/upload`
- 该接口通过前面获得的上下文来连续获取一定数量的人脸信息，并上传服务器
- 使用方法： POST
- 是否需要管理员权限：是
- 请求体类型：`json`
    - 请求结构
        ```typescript
        interface{
            face:string,
            token:string
        }
        ```
    - 说明：
        - face: 为截取到的人脸的PNGges图片的base64编码
        - token: 为 `录入用户上下文` 获得的token
- 响应体荷载：无

#### 录入用户上下文结束 `/user-register/close`
- 该接口通过token 确定并关闭上下文
- 使用方法：POST
- 是否需要管理权限：是
- 请求体类型：`string`
    - 说明： 这是来自 `录入用户上下文` 接口的token
- 响应体荷载：无

#### 用户列表 `/user/list`
- 该接口提供指定分页的用户列表信息
- 使用方法：GET
- 是否需要管理员权限：是
- 请求体类型：无
- 请求参数：
    ``` typescript
    interface GetUserList{
        pageSize:int,
        page:int
    }
    ```
    - 示例
        - 一页 6个，第5页 ： URI：`/admin/user/list?pageSize=6&page=5`

    - 说明：
        - pageSize: 分页大小
        - page： 当前页面
- 响应体荷载：`json`
    - 荷载结构：
        ```typescript
        interface UserInfo{
            name:string,
            identity:int
        }
        type UserList = UserInfo[]
        ```
    - 说明：
        - 响应荷载为一个`UserInfo`列表

#### 添加用户 `/user/add`
- 该接口通过提供人脸录入token, 将用户信息与人脸信息绑定
- 使用方法：POST
- 是否需要管理员权限：是
- 请求体类型： `json`
    - 请求类型
        ```typescript
        interface AddUser{
            token:sting,
            name:string,
            identity:int
        }
        ```
    - 说明：
        - token: 为 `录入用户上下文` 获得的token
        - name:用户名称
        - identity:用户id
- 响应体荷载：无

#### 删除用户 `/user/delete`
- 该接口通过提供用户Id来移除用户
- 使用方法： POST
- 是否需要管理员权限：是
- 请求体类型：无请求体
- 请求参数：
    ```typescript
    interface DeleteArg{
        identity:int
    }
    ```
    - 实例： 当用户id为132, 请求URI为：`/admin/user/delete?identity=132`
    - 说明：identity:为用户唯一标识符

#### 管理员登录 `/login`
- 该接口进行管理员登陆
- 使用方法：POST
- 是否需要管理权限：否
- 请求体类型：`json`
    - 请求类型：
        ```typescript
        interface AdminLogin{
            name:string,
            password:string
        }
        ```
    - 说明：
        - name: 管理员名称
        - password:管理密码
- 响应体荷载：string
    - 管理员的鉴权上下文信息


## 附加说明：
1. 如果需要管理员权限，那个该权限信息会在请求头“Authorization” 提供
2. 所有的响应体均需要包裹在`Result<T>` 中，其中`T`为响应体荷载
3. `请求体` 表示通过http请求的请求体传递数据
4. `请求参数`表示通过http 请求URI 参数提供数据