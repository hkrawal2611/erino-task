import { Router } from 'express'
import { contactsController } from '../controllers/contact.controller';


const conatctRoutes = Router();
const contact = new contactsController();


conatctRoutes.get('/list', contact.GetAllContacts);
conatctRoutes.get('/:id', contact.GetContactById);
conatctRoutes.post('/add-contact', contact.CreateContacts)
conatctRoutes.post('/update-contact/:id', contact.UpdateContacts)
conatctRoutes.post('/delete-contact/:id', contact.HardDeleteContact)


export default conatctRoutes