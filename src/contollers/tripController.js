const router = require('express').Router();

const preloadOne = require('../middlewares/preload');
const formatErrorMsg = require('../util/formatErrorMsg');
const { isUser, isOwner } = require('../middlewares/guard');
const { tripValidation } = require('../middlewares/validation');
const { createOne, delOne, editOne, getAll} = require('../services/tripService');

router.get('/', async(req, res) => {
    try {
        const trips= await getAll();
        res.render('trips/shared-trips', { title: 'Shared Trips', trips })
    } catch (error) {
        res.redirect('404');
    }
});

router.get('/create', isUser(), (req, res) => {
    try {
        res.render('trips/create', { title: 'Create Offer' })
    } catch (error) {
        res.redirect('404');
    }
});

router.post('/create', isUser(), tripValidation(), async (req, res) => {
    let trip={};
    try {
        if (req.tripErrors) {
            throw req.tripErrors;
        }
        const {start,end,date,time,carImage,carBrand,seats,price,description } = req.body;
        trip = {
            start,
            end,
            date,
            time,
            carImage,
            carBrand,
            seats,
            price,
            description,
            owner: req.user._id
        }
        await createOne(trip);
        res.redirect('/');
    } catch (error) {
        if (error.name == 'inputError'||error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('trips/create', { title: 'Create Offer', errors, trip:req.body });
        } else  {
            res.redirect('/404')
        } 
    }
});

router.get('/:id/details', preloadOne(), async (req, res) => {
    try {
        const trip = req.trip;
        if (trip.buddies.length > 0) {
            trip.buddies = trip.buddies.join(', ');
        }
        const ctx = {
            title: 'Details',
            trip
        }
        // if (!req.user) {
        //     ctx.guest = 'guest';
        // }
        // if (housing.ownerId == req.user?._id) {
        //     ctx.owner = 'owner';
        // } else {
        //     if(trip.rented.includes(req.user.name)){
        //         ctx.hasRented=true;
        //     }else if(!trip.rented.includes(req.user.name) && trip.pieces>0){
        //         ctx.toRent=true;
        //     }else{
        //         ctx.noPieces=true;
        //     }
        //     ctx.logged = 'logged';
        // }
        res.render('trips/details', ctx);
        
    } catch (error) {
        res.redirect('/404')
    }
});

// router.get('/:id/rent',isUser(), async (req, res) => {
//     try {
//         await rentHousing(req.params.id,req.user._id);
//         res.redirect('/');
//     } catch (error) {
//         res.redirect('/404')
//     }
// });

router.get('/:id/edit', preloadOne(), isOwner(), async (req, res) => {
    try {
        const trip = req.trip;
        if (trip.buddies.length > 0) {
            trip.buddies = housing.buddies.join(', ')
        }
        const ctx = {
            title: 'Edit',
            trip
        }
        res.render('trips/edit', ctx);

    } catch (error) {
        res.redirect('/404')
    }
});

router.post('/:id/edit',preloadOne(),isOwner(),tripValidation(), async (req, res) => {
    let trip={};
    try {
        if (req.tripErrors) {
            throw req.tripErrors;
        }
        const {start,end,date,time,carImage,carBrand,seats,price,description } = req.body;
        trip = {
            start,
            end,
            date,
            time,
            carImage,
            carBrand,
            seats,
            price,
            description,
            owner: req.user._id
        }
        await editOne(req.params.id, trip);
        res.redirect('/');
    } catch (error) {
        if (error.name == 'inputError'||error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('trips/edit', { title: 'Edit Offer', errors, trip: req.body });
        } else  {
            res.redirect('/404')
        } 
    }
});

router.get('/:id/delete', preloadOne(), isOwner(), async (req, res) => {
    try {
        await delOne(req.params.id);
        res.redirect('/');

    } catch (error) {
        res.redirect('/404')
    }
});

module.exports = router;