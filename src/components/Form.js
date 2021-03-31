import { useEffect, useState } from "react"
import axios from '../helper/baseUrl'

function Form(params) {
  const [provinsi, setProvinsi] = useState('')
  const [kota, setKota] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [desa, setDesa] = useState('')
  const [poster, setPoster] = useState(false)

  const [option, setOpton] = useState({
    selectedProv: '',
    selectedKota: '',
    selectedDesa: '',
  })

  const [present, setPresent] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    desa: '',
    kodePos: ''
  })

  useEffect(() => {
    getProvinsi()
    getKota()
    getKecamatan()
    getDesa()
  }, [option])

  function getDesa() {
    if (option.selectedDesa) {
      for (let i = 0; i < kecamatan.length; i++) {
        if (kecamatan[i].name === option.selectedDesa) {
          let result = kecamatan[i].villages
          console.log(kecamatan[i]);
          setPresent({ ...present, kecamatan: kecamatan[i].name, kodePos: kecamatan[i].postalCode })
          setDesa(result)
        }
      }
    }
  }
  console.log(present);
  function getProvinsi() {
    axios({
      url: 'list_propinsi.json?print=pretty',
      methods: 'GET'
    })
      .then(( {data} ) => {
        setProvinsi(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function getKota(selectedProv) {
    if (option.selectedProv) {
      var data = option.selectedProv
    } else {
      var data = selectedProv
    }
    axios({
      url: `list_kotakab/${data}.json?print=pretty`,
      methods: 'GET'
    })
    .then(({ data }) => {
      console.log(selectedProv, '<<<<<<<<<');
        setKota(data)
      })
      .catch(err => {
        console.log(err)
      })
    }

    function getKecamatan(selectedKota) {
    if (option.selectedKota) {
      var data = option.selectedKota
    } else {
      var data = selectedKota
    }
    axios({
      url: `kota_kab/${data}.json?print=pretty`,
      methods: 'GET'
    })
    .then(({ data }) => {
      const newData = []
      data.forEach(element => {
        const temp = newData.findIndex(el => el.name === element.kecamatan)
        if (temp < 0) {
          newData.push({
            name: element.kecamatan,
            postalCode: element.kodepos,
            villages: [element.kelurahan]
          })
          } else {
            newData[temp].villages.push(element.kelurahan)
          }
        })
        setKecamatan(newData)
      })
      .catch(err => {
        console.log(err)
      })
    }

    const handlerProv = (e) => {
      setOpton((input) => ({ ...input, selectedProv: e.target.value}))
    }
    
    const handlerKota = (e) => {
    setOpton((input) => ({ ...input, selectedKota: e.target.value }))
  }

  const handlerDesa = (e) => {
    setOpton((input) => ({ ...input, selectedDesa: e.target.value }))
  }
  
  function showPresent() {
    setPoster(true)
  }

  return (
    <div>
      <div className="mb-3">
        <label for="disabledSelect" className="form-label">Provinsi</label>
        <select onChange={handlerProv} id="disabledSelect" className="form-select">
          {
            Object.keys(provinsi).map((prov, index) => {
              return <option value={prov} key={index}>{provinsi[prov]}</option>
            })
          }
        </select>
      </div>

      <div className="mb-3">
        <label for="disabledSelect" className="form-label">Kota</label>
        <select onChange={handlerKota} id="disabledSelect" className="form-select">
          {kota &&
            Object.keys(kota).map((prov, index) => {
              return <option value={prov} key={index} name={kota[prov]}>{kota[prov]}</option>
            })
          }
        </select>
      </div>

      <div className="mb-3">
        <label for="disabledSelect" className="form-label">Kecamatan</label>
        <select onChange={handlerDesa} id="disabledSelect" className="form-select">
          {kecamatan &&
            kecamatan.map(kec => {
              return <option key={kec.postalCode}>{kec.name}</option>
            })
          }
        </select>
      </div>

      <div className="mb-3">
        <label for="disabledSelect" className="form-label">Desa</label>
        <select id="disabledSelect" className="form-select">
          {desa &&
            desa.map((des, index) => {
              return <option key={index}>{des}</option>
            })
          }
        </select>
      </div>

      <button onClick={showPresent} className="btn btn-success btn-sm">Lihat Kode Pos</button>

      {poster &&
        JSON.stringify(present.kodePos).length > 1 ? JSON.stringify(present.kodePos) : ''
      }
    </div>
  )
}

export default Form