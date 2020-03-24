module.exports = async (app, db) => {

  app.get('/reviews', async (req,res) => {
    let results = []
    await db.collection('reviews').get()
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

  app.get('/reviews/:id', (req, res) => {
    const id = req.params.id
    
    const ref = db.collection('reviews').doc(id)
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
   
  app.post('/reviews', (req, res) => {
    const body = req.body
    const {content, assigner_id, assignee_id} = {...body}

    const reviewObj = {
      content,
      assigner_id,
      assignee_id,
      created_at: new Date()
    }
    db.collection("reviews").add(reviewObj)
    .then(async ref => {
      const review_id = ref.id

      const userRef = db.collection('employees').doc(assigner_id)
      await userRef.set({
        'feedbacks': {
          [review_id]: {
            id,
            assigner_id,
            assignee_id,
            content,
            is_submit: false,
            assigned_at: new Date()
          }
        }
      }, { merge: true })

      return res.json({
        success: 1,
        id: review_id
      })
    }).catch(error => {
      return res.json({
        success: 0,
        error
      })
    })
  })

  app.put('/reviews/:id', async (req, res) => {
    const id = req.params.id

    const body = req.body
    const {content, assigner_id, assignee_id, is_submit} = {...body}

    try {
      const channelRef = db.collection('reviews').doc(id)
      await channelRef.update({
        content,
        assigner_id,
        assignee_id,
        is_submit
      })
      
      const userRef = db.collection('employees').doc(assigner_id)
      await userRef.set({
        'feedbacks': {
          [id]: {
            id,
            assigner_id,
            assignee_id,
            content,
            is_submit,
            assigned_at: new Date()
          }
        }
      }, { merge: true })
    } catch(e) {
      return res.json({
        success: 0
      })
    }
        
    return res.json({
      success: 1
    })
  })



}