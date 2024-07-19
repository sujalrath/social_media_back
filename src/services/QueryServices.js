// create api 
export async function createModel(data,model){
    return await new model(data)
  }
  //get one api
  export async function getSingleData(data, model,populate = null,sort=null) {
    
    const query = model.findOne(data);

    if (populate) {
      query.populate(populate);
    }
    if (sort) {
      query.sort(sort);
    }
  
    return await query.exec();
  }
    //get one by id api
    export async function getSingleDataById(data, model) {
      return await model.findById(data);
    }
    
  // getAll api
  export async function getAllData(data, model,populate = null,sort=null) {
    // return await model.find(data);
    const query = model.find(data);

  if (populate) {
    query.populate(populate);
  }
  if (sort) {
    query.sort(sort);
  }

  return await query.exec();
  }
  
  //  update api
  export async function updateData(where, data, model) {
    return await model.findOneAndUpdate(where, { $set: data }, { new: true });
  }
  
  export async function updateByIdApi(id, data, model) {
    try {
      if (id) {
        let updateData = await model.findByIdAndUpdate(
          { _id: id },
          {
            $set: data,
          },
          {
            new: true,
          }
        );
        return updateData;
      }
    } catch (error) { 
      console.log(error, "error");
    }
  }
  
  //delete  api
  export async function deleteById(id, model) {
    try {
      if (id) {
        let deleteData = await model.findByIdAndUpdate(
          { _id: id },
          {
            $set: {
              is_deleted:true
            },
          },
          {
            new: true,
          }
        );
        return deleteData;
      }
    } catch (error) {
      console.log(error, "error");
    }
  }
  export async function deleteData(data, model) {
    try {
      if (data) {
        let deleteData = await model.findByIdAndUpdate(
        data,
          {
            $set: {
              is_deleted:true
            },
          },
          {
            new: true,
          }
        );
        return deleteData;
      }
    } catch (error) {
      console.log(error, "error");
    }
  }