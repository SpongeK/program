function transformToTree(list){
    if(!list || list.length === 0 ){return {}}
    var tmp = {}
    list.forEach(item => {
        
        let pId = item.parentId
        if(tmp[pId]){
            tmp[pId].push(item)
        }else{
            var obj = [item]
            tmp[pId] = obj
        }
    })
    var tree = {}
    Object.keys(tmp).forEach( key => {
        var el = tmp[key]
        if( key === 0){
            // var cTree = []
            // el.forEach( item => {
            //     var obj = {
            //         id: item.id,
            //         name: item.name,
            //         children: []
            //     }
            //     cTree.push(obj)
            // })
            tree.id = el[0].id
            tree.name = el[0].name
            tree.children = []
        } else{
            setTree(tree.children, key, tmp[key])
        }
        // tree.parendId = key
        // tree.name = tmp[key].name
        // tree.children = tmp[id]
    })
}
function setTree(node, pId, list){
    if(!node || node.length === 0 ){
        node = list
        return
    }else{
        let pNode = node.find( item => {
            return item.id === pId
        })
        if(!pNode){
            setTree(pNode.children, pId, list)
        }else{
            pNode.children = pNode.children.concat(list)
        }
    }
}
// 输入
// var input = [
//     {"id":1, "parentId":0, "name":"xx有限公司"},
//     {"id":2, "parentId":1, "name":"一级部门"},
//     {"id":3, "parentId":2, "name":"二级部门1"},
//     {"id":4, "parentId":3, "name":"三级部门A"},
//     {"id":5, "parentId":3, "name":"三级部门B"},
//     {"id":6, "parentId":2, "name":"二级部门2"},
//     {"id":7, "parentId":6, "name":"三级部门C"}
// ];

// 输出
// var output = {
//     "id":1,
//     "name":"xx有限公司",
//     "children":[
//         {
//             "id":2,
//             "name":"一级部门",
//             "children":[
//                 {
//                     "id":3,
//                     "name":"二级部门1",
//                     "children":[
//                         {
//                             "id":4,
//                             "name":"三级部门A",
//                             "children":[]
//                         },
//                         {
//                             "id":5,
//                             "name":"三级部门B",
//                             "children":[]
//                         }
//                     ]
//                 },
//                 {
//                     "id":6,
//                     "name":"二级部门2",
//                     "children":[
//                         {
//                             "id":7,
//                             "name":"三级部门C",
//                             "children":[]
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// };