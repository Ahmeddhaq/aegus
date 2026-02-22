




const crypto = require('crypto');
const { adminClient, publicClient } = require('./supabaseClient');




function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}




async function createSession(userId, ipAddress, userAgent) {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

  try {
    const { data, error } = await adminClient
      .from('user_sessions')
      .insert({
        user_id: userId,
        session_token: sessionToken,
        expires_at: expiresAt,
        ip_address: ipAddress,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) throw error;
    return { sessionToken, expiresAt, data };
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}




async function verifySession(sessionToken) {
  try {
    const { data, error } = await adminClient
      .from('user_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error) {
      console.error('Session verification error:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}




async function revokeSession(sessionToken) {
  try {
    await adminClient
      .from('user_sessions')
      .delete()
      .eq('session_token', sessionToken);
    return true;
  } catch (error) {
    console.error('Error revoking session:', error);
    return false;
  }
}




async function registerUser(email, password, fullName) {
  try {
    
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, 
    });

    if (authError) throw authError;

    
    const { data: profileData, error: profileError } = await adminClient
      .from('user_profiles')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
      })
      .select()
      .single();

    if (profileError) throw profileError;

    return {
      user: authData.user,
      profile: profileData,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}




async function signInUser(email, password) {
  try {
    
    const { data, error } = await publicClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    
    const { data: profile, error: profileError } = await adminClient
      .from('user_profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) console.warn('Profile not found:', profileError);

    return {
      user: data.user,
      session: data.session,
      profile: profile,
    };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}




async function signOutUser(userId) {
  try {
    
    await adminClient
      .from('user_sessions')
      .delete()
      .eq('user_id', userId);

    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}




async function getUser(userId) {
  try {
    const { data: user, error: userError } = await adminClient.auth.admin.getUserById(
      userId
    );

    if (userError) throw userError;

    const { data: profile, error: profileError } = await adminClient
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) console.warn('Profile not found:', profileError);

    return { user, profile };
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}




async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await adminClient
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

module.exports = {
  generateSessionToken,
  createSession,
  verifySession,
  revokeSession,
  registerUser,
  signInUser,
  signOutUser,
  getUser,
  updateUserProfile,
};
