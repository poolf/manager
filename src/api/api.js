import Axios from 'axios'

//***************************集群相关接口********************************
// 根据关键字查询集群
export const getBclList = (data, num) => {
  return Axios.post('/api/Branch/GetBranchClusterByKey/' + num, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 创建集群
export const addBcl = data => {
  return Axios.post('/api/Branch/AddBranchCluster', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 删除集群信息
export const delBcl = bcID => {
  return Axios.delete('/api/Branch/DeleteBcl/' + bcID, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 修改集群信息
export const putBcl = data => {
  return Axios.put('/api/Branch/PutBcl', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 批量更新门店集群编号
export const putAllBcl = data => {
  return Axios.put('/api/Branch/PutAllBrandCl', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}

//***************************门店相关接口********************************
// 获取门店信息列表分页
export const getBraListPage = (currentPage, pageSize) => {
  return Axios.get('/api/Branch/GetPage/' + currentPage + '/' + pageSize, {
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取单个门店信息
export const getItemBra = braID => {
  return Axios.get('/api/Branch/Get/' + braID)
}
// 根据关键词查询门店信息
export const getBranchByKey = (data, num) => {
  return Axios.post('/api/Branch/GetBranchByKey/' + num, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
// 添加门店信息
export const addBra = data => {
  return Axios.post('/api/Branch/Add', data)
}
// 修改门店信息
export const putBra = data => {
  return Axios.put('/api/Branch/put', data)
}
// 变更门店状态
export const putBraFlag = data => {
  return Axios.put('/api/Branch/PutTypeFlag', data)
}
// 删除门店信息
export const delBra = braID => {
  return Axios.delete('/api/Branch/Delete/' + braID)
}

//***************************门店管理员相关接口********************************
// 获取当前门店管理员
export const getpreBraManagerList = braID => {
  return Axios.get('/api/BranchRole/GetByBraID/' + braID)
}
// 批量创建当前门店管理员
export const addBraManager = data => {
  return Axios.post('/api/BranchRole/AddList', data)
}
// 删除门店管理员
export const delBraManager = uid => {
  return Axios.delete('/api/BranchRole/Delete/' + uid)
}

//***************************门店配送规则相关接口********************************
// 获取门店配送规则分页列表
export const getBrandDCPage = data => {
  return Axios.post('/api/Branch/GetBrandDCPage', data)
}
// 创建门店配送规则
export const addBrandDC = data => {
  return Axios.post('/api/Branch/AddBrandDisCon', data)
}
// 修改更新门店配送规则
export const updateBrandDC = data => {
  return Axios.put('/api/Branch/PutBrandDisCon', data)
}
// 删除门店配送规则
export const delBrandDC = id => {
  return Axios.delete('/api/Branch/DelBrandDisCon/' + id)
}

//***************************用户相关接口********************************
// 获取用户分页数据
export const getUserPage = data => {
  return Axios.post('/api/users/GetPage', data)
}
// 根据用户id获取用户信息
export const getUserItem = uid => {
  return Axios.get('/api/users/GetByUid/' + uid)
}
// 添加用户信息
export const addUser = data => {
  return Axios.post('/api/users/Add', data)
}
// 修改用户信息
export const putUser = data => {
  return Axios.put('/api/users/PutUser', data)
}
// 变更用户状态
export const putUserflag = data => {
  return Axios.put('/api/users/PutUserFlag', data)
}
// 删除用户
export const delUser = uid => {
  return Axios.delete('/api/users/delete/' + uid)
}

//***************************商品类型相关接口********************************
// 获取商品类数据分页
export const getProClassPage = data => {
  return Axios.post('/api/ProductClass/GetPage', data)
}
// 查询指定父类的所有子类
export const getItemParClassList = parclsID => {
  return Axios.get('/api/ProductClass/GetByParClsID/' + parclsID)
}
//根据指定类别编号查询所有父编号
export const getAllParClsID = clsID => {
  return Axios.get('/api/ProductClass/GetAllParClsID/' + clsID)
}
// 批量更新类别状态
export const putProClassFlag = data => {
  return Axios.put('/api/ProductClass/PutAllPClsType', data)
}
// 修改商品类别
export const putProClass = data => {
  return Axios.put('/api/ProductClass/Put', data)
}
// 添加商品类别
export const addProClass = data => {
  return Axios.post('/api/ProductClass/Add', data)
}
//***************************商品信息相关接口********************************
// 添加商品
export const addProduct = data => {
  return Axios.post('/api/Product/Add', data, {
    headers: { 'Content-Type': 'application/json' }
  })
}
// 获取商品分页列表
export const getProductPage = data => {
  return Axios.post('/api/Product/GetPage', data)
}
// 变更商品上下架时间
export const putProSaleTime = data => {
  return Axios.put('/api/Product/PutProSaleTime', data)
}
// 修改商品总部售价
export const putProPrice = data => {
  return Axios.put('/api/Product/PutProPrice', data)
}
// 变更商品状态
export const putProFlag = data => {
  return Axios.put('/api/Product/PutProFlag', data)
}
// 修改商品
export const putPro = data => {
  return Axios.put('/api/Product/Put', data)
}

//***************************商品集群相关接口********************************
// 商品集群价格分页列表
export const GetProBranCluPricePage = data => {
  return Axios.post('/api/Product/GetProBranCluPricePage', data)
}
// 更新商品门店集群价格
export const PutProBranCluPrice = data => {
  return Axios.put('/api/Product/PutProBranCluPrice', data)
}
// 批量添加商品门店集群价格
export const AddProBranCluPrice = data => {
  return Axios.post('/api/Product/AddProBranCluPrice', data)
}
// 删除商品门店集群价格
export const DelProBranCluPrice = id => {
  return Axios.delete('/api/Product/DelProBranCluPrice/' + id)
}
