import {createClient} from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const login = async (payload) => {
    const {email, password} = payload
    return await supabase.auth.signInWithPassword({email, password})
}

export const logout = async () => {
    return await supabase.auth.signOut()
}

export const getSession = async () => {
    return await supabase.auth.getSession()
}

export const refreshSessionData = async () => {
    return await supabase.auth.refreshSession()
}

export const getAllDiscomfortEvents = async () => {
    return await supabase.from('DiscomfortLog').select('*').order("created_at", {ascending: false})
}

export const addDiscomfortEvent = async (payload) => {
    const {date, events} = payload
    return await supabase.from('DiscomfortLog').insert([{
        date: date,
        events: JSON.stringify(events)
    }]).select()
}

export const updateDiscomfortEvent = async (payload) => {
    const {id, date, events} = payload
    return await supabase
        .from('DiscomfortLog')
        .update({date: date, events: JSON.stringify(events)})
        .eq('id', id)
        .select()
}
