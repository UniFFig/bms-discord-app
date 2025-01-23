import { Sequelize } from 'sequelize';
import seq from '../database.js'

// Setting db model for missed smites
const smite_table = seq.define('smite_table', {})

export default smite_table;