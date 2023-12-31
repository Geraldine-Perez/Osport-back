const { Users, Sports, Events } = require('../models');

const sportCtrl = {
/**
 * Retrieves all sports.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with an array of sports or an error message.
 */
  getAllSports: async (req, res) => {
    try {
      // SELECT * FROM sports;
      const sports = await Sports.findAll({
        attributes: ['id', 'name'],
      });
      res.json(sports);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
 * Retrieves a specific sport by its ID.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the sport or an error message.
 */
  getOneSport: async (req, res) => {
    const sportId = req.params.id;

    try {
      // SELECT * FROM sports WHERE id = 'valeur_sports_id';
      const sport = await Sports.findByPk(sportId, {
        attributes: ['id', 'name'],
        include: [
          {
            model: Events,
            as: 'sportEvents',
            attributes: ['title', 'region', 'zipCode', 'city', 'street', 'description', 'maxNbParticipants', 'startingTime', 'endingTime'],
            include: [
              {
                model: Users,
                as: 'creator',
                attributes: ['userName'],
              }],
          },
        ],
      });

      if (!sport) {
        res.status(404).json('Sport introuvable');
      } else {
        res.json(sport);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /**
 * Creates a new sport (only for admin users).
 *
 * @param {object} req - The request object.
 * @param {object} req.body - The data provided in the request body.
 * @param {string} req.body.name - The name of the created sport.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with a success message or an error.
 */
  createOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const { name } = req.body;
        const bodyErrors = [];
        if (!name) {
          bodyErrors.push('Le nom du sport ne peut pas être vide');
        }
        if (bodyErrors.length > 0) {
          res.json({
            error: bodyErrors,
          });
        }
        const checkSport = await Sports.findOne({
          where: {
            name,
          },
        });
        if (checkSport) {
          res.json({
            error: 'Nom de sport déjà utilisé',
          });
          return;
        }
        // INSERT INTO sports (name) VALUES ('nom_du_sport');
        await Sports.create({ name });
        res.json({
          message: 'Le nouveau sport a bien été créé',
        });
      } catch (error) {
        res.json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

  /**
 * Updates a sport (only for admin users).
 *
 * @param {object} req - The request object.
 * @param {object} req.body - The data provided in the request body.
 * @param {string} req.body.name - The name of the updated sport.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with the updated sport or an error.
 */
  updateOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const sportId = req.params.id;
        const sport = await Sports.findByPk(sportId);

        if (!sport) {
          res.status(404).send(`Le sport avec l'identifiant ${sportId} est introuvable`);
        } else {
          const { name } = req.body;

          if (name) {
            sport.name = name;
          }

          // Sauvegarde des champs dans la BDD.
          // UPDATE sports SET name = 'nouveau_nom' WHERE id = 'sport_id';
          await sport.save();
          res.json(sport);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

  /**
 * Deletes a sport (only for admin users).
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves with a success message or an error.
 */
  deleteOneSport: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const sportId = req.params.id;
        const sport = await Sports.findByPk(sportId);

        if (!sport) {
          res.status(404).send(`Le sport avec l'identifiant ${sportId} est introuvable`);
        } else {
          //  DELETE FROM sports WHERE id = 'sport_id';
          await sport.destroy();
          res.json({ message: `Le sport avec l'identifiant ${sportId} vient d'être supprimé` });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.json({
        error: 'Vous n\'avez pas les droits',
      });
    }
  },

};

module.exports = sportCtrl;
