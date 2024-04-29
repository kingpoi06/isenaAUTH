import PFs from "../models/PFModels.js";
import Pasiens from "../models/PasienModel.js";
// import argon2 from "argon2";

export const getPFs = async(req, res) =>{
    try {
        let response;
        if(req.nobpjs === nobpjs){
            response = await PF.findAll({
                attributes:['uuid',
                "unitpelayanan", 
                "keluhanutama", "keluhantambahan", "riwayatpenyakitsekarang", 
                "riwayatpenyakitdahulu", "riwayatpenyakitkeluarga", "riwayatalergi", 
                "terapiyangpernahdijalani", "obatnyangseringdigunakan", "obatyangsedangdikonsumsi",
                "keadaanumum", "kesadaranGCS", "tekanandarah", "nadi", "suhu", "freknafas",
                "beratbadan", "tinggibadan", "imtBBTB", "kepala", "thorax", "abdormen", "ekstremitas", "lainnya",
                "statusmental", "responemosi", "hubunganpasiendengankeluarga", "ketaatanmenjalaniibadah", "bahasa"],
                include:[{
                    model: Pasiens,
                    attributes:['nobpjs']
                }]
            });
        }else{
            response = await PF.findAll({
                attributes:['uuid',
                "unitpelayanan", 
                "keluhanutama", "keluhantambahan", "riwayatpenyakitsekarang", 
                "riwayatpenyakitdahulu", "riwayatpenyakitkeluarga", "riwayatalergi", 
                "terapiyangpernahdijalani", "obatnyangseringdigunakan", "obatyangsedangdikonsumsi",
                "keadaanumum", "kesadaranGCS", "tekanandarah", "nadi", "suhu", "freknafas",
                "beratbadan", "tinggibadan", "imtBBTB", "kepala", "thorax", "abdormen", "ekstremitas", "lainnya",
                "statusmental", "responemosi", "hubunganpasiendengankeluarga", "ketaatanmenjalaniibadah", "bahasa"],
                where:{
                    pasienId: req.pasienId
                },
                include:[{
                    model: Pasiens,
                    attributes:['nobpjs']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPFById = async(req, res) =>{
    
}


export const createPF = async (req, res) => {
    const { unitpelayanan,
        keluhanutama, keluhantambahan, riwayatpenyakitsekarang, 
        riwayatpenyakitdahulu, riwayatpenyakitkeluarga, riwayatalergi, 
        terapiyangpernahdijalani, obatnyangseringdigunakan, obatyangsedangdikonsumsi,
        keadaanumum, kesadaranGCS, tekanandarah, nadi, suhu, freknafas,
        beratbadan, tinggibadan, imtBBTB, kepala, thorax, abdormen, ekstremitas, lainnya,
        statusmental, responemosi, hubunganpasiendengankeluarga, ketaatanmenjalaniibadah, bahasa, pasienId } = req.body;
    try {
        const pasien = await Pasiens.findByPk(pasienId);
        if (!req.session.pasienId) {
            return res.status(401).json({ msg: "Mohon masukkan data pasien" });
        }

        const pf = await PFs.create({
            unitpelayanan: unitpelayanan,
            // PEMERIKSAAN ANAMNESA
            keluhanutama: keluhanutama, keluhantambahan: keluhantambahan, riwayatpenyakitsekarang: riwayatpenyakitsekarang,
            riwayatpenyakitdahulu: riwayatpenyakitdahulu, riwayatpenyakitkeluarga:  riwayatpenyakitkeluarga,
            riwayatalergi: riwayatalergi, terapiyangpernahdijalani: terapiyangpernahdijalani, obatnyangseringdigunakan: obatnyangseringdigunakan,
            obatyangsedangdikonsumsi: obatyangsedangdikonsumsi,

            // PEMERIKSAAN FISIK
            keadaanumum: keadaanumum,
            kesadaranGCS: kesadaranGCS,
            tekanandarah: tekanandarah,
            nadi: nadi,
            suhu: suhu,
            freknafas: freknafas,

            //antrometri
            beratbadan: beratbadan,
            tinggibadan: tinggibadan,
            imtBBTB: imtBBTB,

            //status generalis
            kepala: kepala,
            thorax: thorax,
            abdormen: abdormen,
            ekstremitas: ekstremitas,
            lainnya: lainnya,

            //sosiokultural & baik
            statusmental: statusmental,
            responemosi: responemosi,
            hubunganpasiendengankeluarga: hubunganpasiendengankeluarga,
            ketaatanmenjalaniibadah: ketaatanmenjalaniibadah,
            bahasa: bahasa,

            pasienId: pasienId 
        });

        res.status(201).json({ msg: "Pemeriksaan Fisik Created Successfully", pf });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const updatePF = async(req, res) =>{
    
}
export const deletePF = async(req, res) =>{
    
}