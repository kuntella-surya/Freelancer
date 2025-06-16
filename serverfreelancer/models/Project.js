import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uname: {
    type: String,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  budget: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  duration: {
    type: String,
    required: true,
  },
  category: {
  type: String,
  enum: [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Home Cleaning',
    'Appliance Repair',
    'AC Service & Repair',
    'Mobile Repair',
    'Bike Repair',
    'Car Repair',
    'Photography',
    'Event Management',
    'Gardening',
    'Pest Control',
    'Tuition / Coaching',
    'Tailoring',
    'Laundry',
    'Beauty & Salon',
    'Babysitting',
    'Pet Care',
    'Delivery & Pickup',
    'Construction',
    'Others',
  ],
  required: true,
}
,
  projectType: {
    type: String,
    enum: ['fixed', 'hourly'],
    default: 'fixed',
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'cancelled'],
    default: 'open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }

});

const Projectpost = mongoose.model('Project', projectSchema);
export default Projectpost;