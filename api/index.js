// inti dari API
const express = require('express')
const app = express()
const port = 5110
const cors = require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config()
const supabase = require('@supabase/supabase-js')

//supabase
const URL_supabase = "https://qqfuljbpomnymsbgvrnw.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZnVsamJwb21ueW1zYmd2cm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4NjMwNDAsImV4cCI6MjAzOTQzOTA0MH0.I8QDPwixkr_wvn1NuNsau4OU4u8yMCa2cXWG1tg8WQI"
const db = supabase.createClient(URL_supabase, supabase_key)


app.get('/', (req, res)=>{
    res.send('API Berjalan route utama /data untuk menampilkan semua data cuy....')
})

app.get('/data', async (req, res)=>{
    const AmbilDataYetim = await db.from('tb_yetimsnack_app').select('*')
    if(AmbilDataYetim.error){
        res.status(500).json({ error: 'Gagal mengambil data' })
    } else {
        res.json({ AmbilDataYetim })
    }
})

app.get('/informasi/:username', async (req, res) =>{
    const username = req.params.username
    const AmbilDataBerdasarkanUsername = await db.from('tb_yetimsnack_app').select('*').eq('username', username)
    if(AmbilDataBerdasarkanUsername.error){
        res.status(500).json({ error: `Gagal mengambil data untuk username ${username}` })
    }else{
        res.json({ AmbilDataBerdasarkanUsername })
        console.log(AmbilDataBerdasarkanUsername)
    }
})



app.listen(port, ()=>{
    console.log("Berjalan di http://localhost:"+port)
})