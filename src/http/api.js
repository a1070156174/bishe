/*
 * @Author: your name
 * @Date: 2020-02-26 20:37:26
 * @LastEditTime: 2020-05-27 13:54:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\http\api.js
 */
/** 
 * api接口统一管理
 */
import { get, post,put,deletefn,qspost,qsput } from './axios'; 
import qs from 'qs';
import Axios from 'axios';
/**
 * 
 * @param {string} params 
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象s
 * 最后通过export导出topics。s
 */



//登录
export const Login= params => post('/tokens', qs.stringify(params))

//全局获取userinfo
export const userinfotoken = params => get('/tokens', params)

//全局查询所有部门
export const getdepartment=params => get('/departments', params);//查询 //查询,所有部门


// IndexInfo 页面
export const IndexClientgetform= params => get('/employees', params); 
export const IndexClientselect=params => get('/employees', params);
export const IndexClientadd=params => post('/employees', params);
export const IndexClientdel=params => deletefn('/employees', params);
export const IndexClientupdate=params => put('/employees', params);



//BasicInfo页面id
export const BasicInfogetform= params => get('/salaries', params);
export const BasicInfoselect=params => get('/salaries', params);  
export const BasicInfoadd=params => post('/salaries', params);
export const BasicInfodel=params => deletefn('/salaries', params);
export const BasicInfoupdate=params => put('/salaries', params);
export const BasicInfogetname= params => get('/salaries', params);




//DutyInfo
export const DutyInfogetform= params => get('/duties', params); 
export const DutyInfoselect=params => get('/duties', params);
export const DutyInfoadd=params => post('/duties', params);
export const DutyInfodel=params => deletefn('/duties', params);
export const DutyInfoupdate=params => put('/duties', params);
export const DutyInfogetname= params => get('/departments/{id}', params);  



//WorkCard
export const WorkCardgetform= params => get('/workTimes', params); 
export const WorkCardselect=params => get('/workTimes', params);
export const WorkCardadd=params => post('/workTimes', params);
export const WorkCarddel=params => deletefn('/workTimes', params);
export const WorkCardupdate=params => put('/workTimes', params);
export const WorkCardselectinfo= params => get('/WorkCard/getinfo', params);  



//XLCard
export const XLCardgetform= params => get('/workTimes', params); 
export const XLCardselect=params => get('/workTimes', params);   
export const XLCardadd=params => post('/workTimes', params);
export const XLCarddel=params => deletefn('/workTimes', params);
export const XLCardupdate=params => put('/workTimes', params);
export const XLCardselectinfo= params => get('/XLCard/getinfo', params);  



//Oudsiders
export const Oudsidersgetform= params => get('/outSiders', params); 
export const Oudsidersselect=params => get('/outSiders', params);
export const Oudsidersadd=params => post('/outSiders',params);
export const Oudsidersdel=params => deletefn('/outSiders', params);
export const Oudsidersupdate=params => put('/outSiders', params);



//TakeOUt
export const TakeOUtgetform= params => get('/takeOuts', params); 
export const TakeOUtselect=params => get('/takeOuts', params);
export const TakeOUtadd=params => post('/takeOuts', params);
export const TakeOUtdel=params => deletefn('/takeOuts', params);
export const TakeOUtupdate=params => put('/takeOuts', params);



//SchoolCar
export const SchoolCargetform= params => get('/schoolCars', params); 
export const SchoolCarselect=params => get('/schoolCars', params);
export const SchoolCardel=params => deletefn('/schoolCars', params);
export const SchoolCarupdate=params => put('/schoolCars', params);
export const SchoolCaradd=params => post('/schoolCars', params);



//SchoolAftherCar
export const SchoolAftherCargetform= params => get('/schoolAfterCars', params);   
export const SchoolAftherCarselect=params => get('/schoolAfterCars', params);
export const SchoolAftherCaradd=params => post('/schoolAfterCars', params);
export const SchoolAftherCardel=params => deletefn('/schoolAfterCars', params);
export const SchoolAftherCarupdate=params => put('/schoolAfterCars', params);



//Equipment
export const Equipmentgetform= params => get('/equipment', params);
export const Equipmentselect=params => get('/equipment', params);
export const Equipmentadd=params => post('/equipment', params);
export const Equipmentdel=params => deletefn('/equipment', params);
export const Equipmentupdate=params => put('/equipment', params);



//Baoxiu
export const Baoxiuupdate=params => put('/equipment', params);
export const Baoxiuselect=params => get('/equipment', params);




//SchoolAffairs
export const SchoolAffairsgetform= params => get('/schoolAffairs', params);     
export const SchoolAffairsselect=params => get('/schoolAffairs', params); 
export const SchoolAffairsadd=params => post('/schoolAffairs', params);
export const SchoolAffairsdel=params => deletefn('/schoolAffairs', params);
export const SchoolAffairsupdate=params => put('/schoolAffairs', params);



//Notice
export const Noticegetform= params => get('/notices', params);   
export const Noticeselect=params => get('/notices', params);  
export const Noticeadd=params => post('/notices', params);
export const Noticedel=params => deletefn('/notices', params);
export const Noticeupdate=params => put('/notices', params);



//Montior
export const Montiorgetform= params => get('/monitors', params);    
export const Montiorselect=params => get('/monitors', params);
export const Montioradd=params => post('/monitors', params);
export const Montiordel=params => deletefn('/monitors', params);
export const Montiorupdate=params => put('/monitors', params);
export const Montiorswitchupdate=params => put('/monitors', params);




//Journal
export const Journalgetform= params => get('/accesses', params);



//Admin
export const Admingetform= params => get('/users', params);    
export const Adminselect=params => get('/users', params);
export const Adminadd=params => post('/register', qs.stringify(params));
export const Admindel=params => deletefn('/users',params);
export const Adminupdate=params => put('/users', params);

