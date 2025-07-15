const db = require("../db/models");
const { Op } = require("sequelize");

//  Create a new Event
exports.createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, capacity } = req.body;

    if (!title || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (capacity < 1 || capacity > 1000) {
      return res
        .status(400)
        .json({ message: "Capacity must be between 1 and 1000" });
    }

    const event = await db.Event.create({
      title,
      dateTime,
      location,
      capacity,
    });

    res.status(201).json({
      message: "Event created successfully",
      eventId: event.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get Event Details with registered users
exports.getEventDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await db.Event.findByPk(id, {
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName", "email"],
          through: { attributes: [] },
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  User Registering  for an Event
exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const event = await db.Event.findByPk(eventId, {
      include: [{ model: db.User }],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (new Date(event.dateTime) < new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot register for past events" });
    }

    const usersRegistered = await event.countUsers();
    if (usersRegistered >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyRegistered = await event.hasUser(user);
    if (alreadyRegistered) {
      return res.status(400).json({
        message: "User already registered for this event",
      });
    }

    await event.addUser(user);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Registration for an event
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const event = await db.Event.findByPk(eventId);
    const user = await db.User.findByPk(userId);

    if (!event || !user) {
      return res.status(404).json({ message: "Event or User not found" });
    }

    const isRegistered = await event.hasUser(user);
    if (!isRegistered) {
      return res.status(400).json({
        message: "User is not registered for this event",
      });
    }

    await event.removeUser(user);
    res.json({ message: "Registration cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  List Upcoming Events (sorted by date & location)
exports.listUpcomingEvents = async (req, res) => {
  try {
    const events = await db.Event.findAll({
      where: {
        dateTime: { [Op.gt]: new Date() },
      },
      order: [
        ["dateTime", "ASC"],
        ["location", "ASC"],
      ],
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Event Stats (registrations, capacity, % used)
exports.getEventStats = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await db.Event.findByPk(id, {
      include: [
        {
          model: db.User,
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const totalRegistrations = event.Users.length;
    const remainingCapacity = event.capacity - totalRegistrations;
    const percentageUsed = (
      (totalRegistrations / event.capacity) *
      100
    ).toFixed(2);

    res.json({
      eventId: event.id,
      title: event.title,
      totalRegistrations,
      remainingCapacity,
      percentageUsed: `${percentageUsed}%`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Get ALL events with registered users
exports.getAllEventsWithRegistrations = async (req, res) => {
  try {
    const events = await db.Event.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "firstName", "lastName", "email"],
          through: { attributes: [] },
        },
      ],
      order: [["dateTime", "ASC"]],
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
