import Pasien from "../models/PasienModel.js";
import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getPasiens = async(req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Pasien.findAll({
                attributes:['uuid','nama','tgllahir','umur','alamat','norm','nobpjs'],
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }else{
            response = await Pasien.findAll({
                attributes:['uuid','nama','tgllahir','umur','alamat','norm','nobpjs'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getPasienById = async(req, res) =>{
    try {
        const pasien = await Pasien.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pasien) return res.status(404).json({msg: "Data not found!"});
        let response;
        if(req.role === "admin"){
            response = await Pasien.findOne({
                attributes:['uuid','nama','tgllahir','umur','alamat','noroom','nobpjs'],
                where:{
                    id: pasien.id
                },
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }else{
            response = await Pasien.findOne({
                attributes:['uuid','nama','tgllahir','umur','alamat','norm','nobpjs'],
                where:{
                    [Op.and]:[{id: pasien.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes:['username','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createPasien = async(req, res) =>{
    const {nama, tgllahir, umur, alamat, norm, nobpjs} = req.body;
    try {
        await Pasien.create({
            nama: nama,
            tgllahir: tgllahir,
            umur: umur,
            alamat: alamat,
            norm: norm,
            nobpjs: nobpjs,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Pasien Berhasil Dimasukan!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePasien = async(req, res) =>{
    try {
        const pasien = await Pasien.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pasien) return res.status(404).json({msg: "Data not found!"});
        const {nama, tgllahir, umur, alamat, norm, nobpjs} = req.body;
        if(req.role === "admin"){
            await Pasien.update({nama, tgllahir, umur, alamat, norm, nobpjs},{
                where:{
                    id: pasien.id
                }
            });
        }else{
            if(req.userId !== pasien.userId) return res.status(403).json({msg: "Access X"});
            await Pasien.update({nama, tgllahir, umur, alamat, norm, nobpjs},{
                where:{
                    [Op.and]:[{id: pasien.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Pasien berhasil di perbaharui!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deletePasien = async(req, res) =>{
    try {
        const pasien = await Pasien.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!pasien) return res.status(404).json({msg: "Data not found!"});
        const {nama, tgllahir, umur, alamat, norm, nobpjs} = req.body;
        if(req.role === "admin"){
            await Pasien.destroy({
                where:{
                    id: pasien.id
                }
            });
        }else{
            if(req.userId !== pasien.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Pasien.destroy({
                where:{
                    [Op.and]:[{id: pasien.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data Pasien berhasil dihapus!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}