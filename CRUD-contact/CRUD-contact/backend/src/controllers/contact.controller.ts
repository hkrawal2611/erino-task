import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { In, Not } from "typeorm";
import { contactsEntity } from "../entities/contact.entity";

export class contactsController {

    // ALL CONTACT
    async GetAllContacts(req: Request | any, res: Response | any) {
        try {

            const page = parseInt(req?.query?.pageNumber as string, 10) || 1;
            const pageSize = parseInt(req?.query?.recordsPerPage as string, 10) || 10;
            const sortField = req?.query?.sortBy || ("id" as string | undefined);
            const sortOrder = req?.query?.sortOrder?.toUpperCase() || ("DESC" as "ASC" | "DESC" | undefined);


            // GET CONTACTS REPOSITORY
            const contactsRepository = AppDataSource.getRepository(contactsEntity);
            // INITIALIZE CONTACTS REPOSITORY
            let query = contactsRepository.createQueryBuilder('conatct');

            // APPLY SORTING BY DESIGNATION
            if (sortField && sortOrder && sortField.split('.').length > 1) {
                query = query.orderBy(sortField, sortOrder);
            }
            else {
                // DEFAULT SORTING LOGIC
                query = query.orderBy(`conatct.${sortField}`, sortOrder);
            }

            // APPLY PAGINATION
            if (req?.query?.records !== "all") {
                query = query.skip((page - 1) * pageSize).take(pageSize);
            }

            // EXECUTE THE QUERY
            const contactsList = await query.getMany();

            // GET TOTAL RECORDS COUNT
            const totalRecords = await query.getCount();

            const pager = {
                sortBy: sortField || "id",
                sortOrder: sortOrder || "ASC",
                pageNumber: page,
                recordsPerPage: pageSize,
                totalRecords: totalRecords,
                filteredRecords: contactsList?.length,
            };

            return res.status(200).json({
                success: true,
                message: "Contacts retrieved successfully.",
                data: {
                    contacts: contactsList,
                    pager: pager,
                },
            });
        } catch (error:any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while retrieving contacts.",
                error: error.message || "Internal Server Error",
            });
        }
    }

    // CREATE CONTACTS
    async CreateContacts(req: Request | any, res: Response | any) {
        try {
            // GET CONTACTS REPOSITORY
            const contactsRepository = AppDataSource.getRepository(contactsEntity);
            const contactDetails = req?.body;

            if (contactDetails?.phone_number) {
                const conatctExisit: any = contactDetails?.phone_number
                const exisitConatct = await contactsRepository.findOne({ where: { phone_number: conatctExisit } })

                if (exisitConatct) {
                    return res.status(500).json({
                        success: false,
                        message: "Conatct Details Already Exist",
                    });
                }
            }

            const savedContacts = await contactsRepository.save(contactDetails);

            return res.status(200).json({
                success: true,
                message: "Contacts Created successfully.",
                data: {
                    contacts: savedContacts,
                },
            });
        } catch (error:any) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while retrieving contacts.",
                error: error.message || "Internal Server Error",
            });
        }
    }

    // UPDATE CONTACTS
    async UpdateContacts(req: Request | any, res: Response | any) {
        try {
            // GET CONTACTS REPOSITORY
            const contactsRepository = AppDataSource.getRepository(contactsEntity);
            const id = parseInt(req?.params?.id, 10);
    
            // Find the existing contact
            const contactToUpdate = await contactsRepository.findOne({ where: { id } });
    
            if (!contactToUpdate) {
                return res.status(404).json({
                    success: false,
                    message: "Contact Not Found",
                });
            }
    
            const contactDetails = req?.body;
    
            // If phone_number is provided, check for uniqueness (excluding current contact)
            if (contactDetails?.phone_number) {
                const existingContact = await contactsRepository.findOne({
                    where: {
                        phone_number: contactDetails.phone_number,
                        id: Not(id), // Exclude current contact from the check
                    },
                });
    
                if (existingContact) {
                    return res.status(400).json({
                        success: false,
                        message: "Phone number already in use by another contact.",
                    });
                }
            }
    
            // Update the contact
            await contactsRepository.update(id, contactDetails);
    
            return res.status(200).json({
                success: true,
                message: "Contact updated successfully.",
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while updating the contact.",
                error: error.message || "Internal Server Error",
            });
        }
    }

    async GetContactById(req: Request, res: Response) {
        try {
            const contactsRepository = AppDataSource.getRepository(contactsEntity);
            const id = parseInt(req.params.id, 10);

            const contact = await contactsRepository.findOne({ where: { id } });

            if (!contact) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: contact,
            });
        } catch (error) {
            console.error("Error fetching contact:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch contact",
            });
        }
    }



    // HARD DELETE CONTACT
    async HardDeleteContact(req: Request | any, res: Response | any) {
        try {
            // GET CONTACTS REPOSITORY
            const mstContact = AppDataSource.getRepository(contactsEntity);
    
            // GET THE ID FROM REQUEST PARAMS
            const id = parseInt(req?.params?.id, 10);
    
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID provided.",
                });
            }
    
            // FIND THE CONTACT BY ID
            const contactToDelete = await mstContact.findOne({ where: { id } });
    
            if (!contactToDelete) {
                return res.status(404).json({
                    success: false,
                    message: "Contact not found.",
                });
            }
    
            // DELETE THE CONTACT
            await mstContact.remove(contactToDelete);
    
            return res.status(200).json({
                success: true,
                message: "Contact deleted successfully.",
                data: {
                    deletedContact: contactToDelete,
                },
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "An error occurred while deleting the contact.",
                error: error.message || "Internal Server Error",
            });
        }
    }
    
    
}
