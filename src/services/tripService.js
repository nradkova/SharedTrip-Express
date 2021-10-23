const Trip = require('../models/Trip');

async function createOne(trip) {
    const current = new Trip({...trip});
    await current.save();
    return current;
}

async function getOneById(id) {
    const current = await Trip.findById(id)
        .populate({path:'buddies',select:'name'})
        .populate('owner')
        .lean();
    if  (current) {
        const viewModel = {
            _id: current._id,
            start: current.start,
            end: current.end,
            date: current.date,
            time: current.time,
            carImage: current.carImage,
            carBrand: current.carBrand,
            seats: current.seats,
            price: current.price,
            description: current.description,
            ownerId: current.owner._id.toString(),
            ownerEmail:current.owner.email,
            buddies: current.buddies.map(x=>x.email),
        }
        return viewModel;
    }
    return undefined;
}

async function editOne(id, trip) {
    const current = await Trip.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
    Object.assign(current, trip);
    return await current.save();
}

async function delOne(id) {
    const current = await Trip.findById(id);
    if (!current) {
        throw new ReferenceError('No such data');
    }
  return await Trip.deleteOne({_id:id});
}

async function getAll() {
    return await Trip.find({}).lean();
}

// async function rentHousing(id, userId) {
//     const current = await Housing.findById(id);
//     if (!current) {
//         throw new ReferenceError('No such data');
//     }
//     current.rented.push(userId);
//     current.pieces-=1;
//     return await current.save();
// }

// async function getAllHousingsOfType(type) {
//     return await Housing.find().where('type').equals(type).lean();
// }


// async function getLastThreeHousings() {
//     return await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
// }


module.exports = {
    createOne,
    getOneById,
    editOne,
    delOne,
    getAll,
}