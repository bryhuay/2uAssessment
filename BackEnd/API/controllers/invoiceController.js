const mongoose = require('mongoose');
const Invoice = require('../models/invoice');




module.exports = {
        show: (req,res,next)=>{
                const stt = "pending";
                Invoice.find({status: stt})
                        .select('_id invoice_number total currency invoice_date due_date vendor_name remittance_address status')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        invoices: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        invoice_number: doc.invoice_number,
                                                        total: doc.total,
                                                        currency: doc.currency,
                                                        invoice_date: doc.invoice_date,
                                                        due_date: doc.due_date,
                                                        vendor_name: doc.vendor_name,
                                                        remittance_address: doc.remittance_address,
                                                        status: doc.status
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        create: (req,res,next)=>{
		const invoice = new Invoice({
                        _id: new mongoose.Types.ObjectId(),
			invoice_number: req.body.invoice_number,
			total: req.body.total,
			currency: req.body.currency,
			invoice_date: req.body.invoice_date,
			due_date: req.body.due_date,
                        vendor_name: req.body.vendor_name,
                        remittance_address: req.body.remittance_address,
                        status: req.body.status
                });

		invoice.save()		
		        .then(result=>{
				console.log(result);
				res.status(201).json({
					message: 'invoice submitted successfully',
					createdInvoice: {
						invoice_number: result.invoice_number,
						total: result.total,
						currency: result.currency,
						invoice_date: result.invoice_date,
						due_date: result.due_date,
                                                vendor_name: result.vendor_name,
                                                remittance_address: result.remittance_address,
                                                status: result.status
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
        changeStatu: (req,res,next)=>{
                const id = req.body.invoiceId;
                const updateOps = req.body;
                delete updateOps._id
                Invoice.update({_id:id},{$set: { status: updateOps.status }})
                        .exec()
                        .then(result => {
                                res.status(200).json({
                                        message: 'Updated Succes'
                                });
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        /*,
        find: (req,res,next)=>{
                const id = req.query.invoiceId;
                Invoice.findById(id)
                        .select('invoice_number total currency invoice_date due_date vendor_name remittance_address')
                        .exec()
                        .then(doc=> {
                                if (doc) {
                                        res.status(200).json({
                                                invoice: doc
                                        });
                                }else{
                                        res.status(404).json({message: 'No valid entry found for provided ID'});
                                }
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        update: (req,res,next)=>{
                const id = req.body.invoiceId;
                const updateOps = req.body;
                delete updateOps._id
                Record.update({_id:id},{$set: updateOps})
                        .exec()
                        .then(result => {
                                res.status(200).json({
                                        message: 'Updated'
                                });
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        delete: (req,res,next)=>{
                const id = req.body.recordId;
                Record.remove({_id: id})
                        .exec()
                        .then(result => {
                                res.status(200).json({
                                        message: 'Deleted'
                                });
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordsBySchool: (req,res,next)=>{
                Record.find({school:req.query.schoolId})
                        .select('_id student date type')
                        .populate('student','DNI name last_name')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        records: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        student: doc.student,
                                                        date: doc.date,
                                                        type: doc.type
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordsByStudent: (req,res,next)=>{
                Record.find({student:req.query.studentId})
                        .select('_id date type')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        records: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        date: doc.date,
                                                        type: doc.type
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordById: (req,res,next)=>{
                Record.find({school:req.query.recordId})
                        .select('_id student date school type')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        records: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        student: doc.student,
                                                        date: doc.date,
                                                        school: doc.school,
                                                        type: doc.type
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordsByDayR: (req,res,next)=>{
                Record.find({date:
                                {
                                        $gte: new Date(req.body.year,req.body.month,req.body.day)
                                }
                        })
                        .select('_id student date type')
                        .populate('student','DNI name last_name')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        records: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        student: doc.student,
                                                        date: doc.date,
                                                        type: doc.type
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordsByDay: (req,res,next)=>{
                const studentId = req.body.studentId;

                let yesterday = new Date();
                let tomorrow = new Date();
                yesterday.setDate(yesterday.getDate() - 1 );
                tomorrow.setDate(tomorrow.getDate() + 1 );
                tomorrow.setHours(0);

                Record.find({
                                        date: { $gt: yesterday, $lt: tomorrow },
                                        student: studentId
                        })
                        .select('_id date type')
                        .exec()
                        .then(docs => {
                                const response = {
                                        count: docs.length,
                                        records: docs.map(doc => {
                                                return {
                                                        _id: doc._id,
                                                        date: doc.date,
                                                        type: doc.type
                                                }
                                        })
                                };
                                res.status(200).json(response);
                        })
                        .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        recordsByDayAndYear: (req,res,next) => {
                //desde el controlador alumnos,ordenar alumnos por año y populate con records.
        },
        countAttendancesByStudent: (req, res, next) => {

                let today = new Date();
                const todaysYear = today.getFullYear();

                Record.aggregate()
                        .project({
                                                year: { $year: '$date' },
                                                date: '$date',
                                                type: '$type',
                                                student: '$student'
                                        })
                        .match({
                                                student: new mongoose.Types.ObjectId(req.query.studentId),
                                                type: 'CHECK_IN',
                                                year: todaysYear
                                        })
                        .count('student')
                        .exec()
                        .then((attendancesCount) => {
                                if ( attendancesCount[0] == undefined ) {
                                        result = {
                                                                        empty: true
                                        };
                                        res.status(200).json(result);
                                }

                                let attendances =  attendancesCount[0].student;

                                Student.findById(req.query.studentId)
                                        .select('school')
                                        .exec()
                                        .then((student) => {
                                                const school = student.school;
                                                SchoolConf.findOne({school: school})
                                                        .exec()
                                                        .then((config) => {
                                                                const startDate = new Date(config.startDate.toISOString());
                                                                let endDate = new Date(config.endDate.toISOString());

                                                                endDate = ( today > endDate)? endDate : today;

                                                                const daysBetween = DateFunctions.daysBetween(startDate, endDate);
                                                                const weekendDays = DateFunctions.weekendDaysBetween(startDate, endDate);
                                                                const holidays = DateFunctions.holidaysBetween(startDate, endDate);
                                                                const vacationDays = DateFunctions.vacationDaysBetween(startDate, endDate, config.vacations);

                                                                const expectedAttendances = daysBetween - (weekendDays + holidays + vacationDays);
                                                                const absences = expectedAttendances - attendances;

                                                                //Total expected attendances
                                                                const totalEndDate =  new Date(config.endDate.toISOString());

                                                                const totalDaysBetween = DateFunctions.daysBetween(startDate, totalEndDate);
                                                                const totalWeekendDays = DateFunctions.weekendDaysBetween(startDate, totalEndDate);
                                                                const totalHolidays = DateFunctions.holidaysBetween(startDate, totalEndDate);
                                                                const totalVacationDays = DateFunctions.vacationDaysBetween(startDate, totalEndDate, config.vacations);

                                                                const totalExpectedAttendances = totalDaysBetween - (totalWeekendDays + totalHolidays + totalVacationDays);

                                                                result = {
                                                                        totalExpectedAttendances: totalExpectedAttendances,
                                                                        expectedAttendances: expectedAttendances,
                                                                        attendances: attendances,
                                                                        absences: absences,
                                                                        startDate: startDate,
                                                                        endDate: endDate,
                                                                        daysBetween: daysBetween,
                                                                        weekendDays: weekendDays,
                                                                        holidays: holidays,
                                                                        empty: false
                                                                };

                                                                res.status(200).json(result);
                                                        });
                                        })
                        })
                        .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                        error: err
                                });
                        });
        },
        attendancesByMonth: (req, res, next) => {

                let studentId = req.body.studentId;
                let currentDate = new Date(req.body.currentDate);
                let currentMonth = currentDate.getMonth() + 1;

                Record.aggregate()
                .project({
                                        month: { $month: '$date' },
                                        date: '$date',
                                        type: '$type',
                                        student: '$student'
                                })
                .match({
                                        student: new mongoose.Types.ObjectId(studentId),
                                        month: currentMonth
                                })
                .exec()
                .then((docs) => {
                        console.log(docs);
                        res.status(200).json(docs);
                })
                .catch((err) => {
                        res.status(500).json(err);
                });
        },
        attendancesByWeek: (req, res, next) => {
                let studentId = req.body.studentId;

                let startDate = new Date();
                let endDate = new Date();

                let dayNumber = (startDate.getDay() == 0)? 7 : startDate.getDay();
                startDate.setDate(startDate.getDate() - (dayNumber));
                endDate.setDate(startDate.getDate() + 5);

                Record.find({
                                        student: new mongoose.Types.ObjectId(studentId),
                                        date: {
                                                $gte: startDate,
                                                $lte: endDate
                                        }
                })
                .select('date type')
                .exec()
                .then((records) => {
                        console.log(records);
                        res.status(200).json(records);
                })
                .catch((err) => {
                        res.status(500).json(err);
                });
        }*/
}