import { app } from "./app"
import { addAgenda } from "./endpoints/agenda/addAgenda"
import { addUser } from "./endpoints/user/addUser"
import { addEnterprise } from "./endpoints/empresas/addEnterprise"
import { deleteAgendaById } from "./endpoints/agenda/deleteAgendaById"
import { deleteUserById } from "./endpoints/user/deleteUserById"
import { deleteEnterpriseById } from "./endpoints/empresas/deleteEnterpriseById"
import { getAllAgenda } from "./endpoints/agenda/getAllAgenda"
import { getAllUser } from "./endpoints/user/getAllUser"
import { getAllEnterprise } from "./endpoints/empresas/getAllEnterpriser"
import { getUserById } from "./endpoints/user/getUserById"
import { getAgendaById } from "./endpoints/agenda/getAgendaById"
import { getEnterpriseById } from "./endpoints/empresas/getEnterpriseById"
import { updateUserById } from "./endpoints/user/updateUserById"
import { updateAgendaById } from "./endpoints/agenda/updateAgendaById"
import { updateEnterpriseById } from "./endpoints/empresas/updateEnterpriseById"
import { addFilho } from "./endpoints/filho/addFilho"
import { deleteFilhoById } from "./endpoints/filho/deleteFilhoById"
import { updateFilhoById } from "./endpoints/filho/updateFilhoById"
import { getAllFilho } from "./endpoints/filho/getAllFilho"
import { getFilhoById } from "./endpoints/filho/getFilhoById"
import { addDireitos } from "./endpoints/direitos-beneficios/addDireitos"
import { deleteDireitosById } from "./endpoints/direitos-beneficios/deleteDireitosById"
import { updateDireitosById } from "./endpoints/direitos-beneficios/updateDireitosById"
import { getAllDireitos } from "./endpoints/direitos-beneficios/getAllDireitos"
import { getDireitosById } from "./endpoints/direitos-beneficios/getDireitosById"


app.post('/agenda' , addAgenda)
app.post('/direitos', addDireitos)
app.post('/filho', addFilho)
app.post('/empresa', addEnterprise)
app.post('/usuarios', addUser)

app.delete('/direitos/:id', deleteDireitosById)
app.delete('/empresa/:id', deleteEnterpriseById)
app.delete('/filho/:id', deleteFilhoById)
app.delete('/agenda/:id', deleteAgendaById)
app.delete('/usuarios/:id', deleteUserById)

app.put('/direitos/:id', updateDireitosById)
app.put('/filho/:id', updateFilhoById)
app.put('/usuarios/:id', updateUserById)
app.put('/empresa/:id', updateEnterpriseById)
app.put('/agenda/:id', updateAgendaById)

app.get('direitos', getAllDireitos)
app.get('direitos/:id', getDireitosById)
app.get('/filho', getAllFilho)
app.get('/filho/:id', getFilhoById)
app.get('/agenda', getAllAgenda)
app.get('/agenda/:id', getAgendaById)
app.get('/empresa', getAllEnterprise)
app.get('/empresa/:id', getEnterpriseById)
app.get('/usuarios', getAllUser)
app.get('/usuarios/:id', getUserById)













