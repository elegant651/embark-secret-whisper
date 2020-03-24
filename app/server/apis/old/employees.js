module.exports = async (app, db) => {


  app.get('/employees', async (req, res) => {
    let results = []
    await db.collection('employees').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data()
          }
          results.push(obj)
        })
      }).catch(error => {
        return res.json({
          success: 0,
          error
        })
      })

    return res.json({
      success: 1,
      results
    })
  })

  app.get('/employees/:id', (req, res) => {
    const id = req.params.id
    
    const ref = db.collection('employees').doc(id)
    ref.get().then(doc => {
      if(doc.exists) {
        return res.json({
          success: 1,
          data: doc.data()
        })  
      } else {
        return res.json({
          success: 0,
          data: 'no id on db'
        })
      }
    }).catch(error => {
      return res.json({
        success: 0,
        error
      })
    })
  })
   
  app.post('/employees', (req, res) => {
    const body = req.body
    const {email, name} = {...body}

    const userObj = {
      email,
      name,
      feedbacks: {},
      created_at: new Date()
    }
    db.collection("employees").add(userObj)
    .then(ref => {
      return res.json({
        success: 1,
        id: ref.id
      })
    }).catch(error => {
      return res.json({
        success: 0,
        error
      })
    })
  })

  app.put('/employees/:id', (req, res) => {
    const id = req.params.id

    const body = req.body
    const {email, name} = {...body}

    const ref = db.collection('employees').doc(id)
    ref.update({
      email,
      name
    }).then(() => {
      return res.json({
        success: 1
      })
    }).catch(error => {
      return res.json({
        success: 0,
        error
      })
    })
  })

  app.delete('/employees/:id', async (req, res) => {
    const id = req.params.id

    try {
      await db.collection('employees').doc(id).delete()
      return res.json({
        success: 1
      })
    } catch (error) {
      return res.json({
        success: 0,
        error
      })
    }
  })

  // app.get('/listReviews/:id', (req, res) => {
  //   const id = req.params.id
    
  //   const ref = db.collection("users").doc(id)
  //   ref.get().then(doc => {
  //     if(doc.exists) {
  //       return res.json({
  //         success: 1,
  //         data: doc.data()
  //       })  
  //     } else {
  //       return res.json({
  //         success: 0,
  //         data: 'no id on db'
  //       })
  //     }
  //   }).catch(error => {
  //     return res.json({
  //       success: 0,
  //       error
  //     })
  //   })
  // })

}