// middleware/permissionMiddleware.js
import supabase from '../supabaseClient.js';

export const checkPermission = (actionName) => {
  return async (req, res, next) => {
    const role_id = req.user.role_id;
    const { data, error } = await supabase
      .from('permissions')
      .select('permission, actions(action_name)')
      .eq('role_id', role_id)
      .eq('actions.action_name', actionName)
      .single();

    if (error || !data) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    if (!data.permission) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    next();
  };
};
