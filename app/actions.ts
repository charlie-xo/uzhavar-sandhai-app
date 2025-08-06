'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createPrice(formData: FormData) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('User is not authenticated');
    return;
  }

  const vegetable_name = formData.get('vegetable_name') as string;
  const price = formData.get('price') as string;
  const market_name = formData.get('market_name') as string;

  await supabase.from('prices').insert({
    vegetable_name,
    price: Number(price),
    market_name,
    user_id: user.id,
  });

  revalidatePath('/');
}

export async function deletePrice(id: string) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    await supabase.from('prices').delete().match({ id: id, user_id: user.id });
    revalidatePath('/');
}

export async function updatePrice(id: string, formData: FormData) {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error('User is not authenticated');
        return;
    }

    const vegetable_name = formData.get('vegetable_name') as string;
    const price = formData.get('price') as string;
    const market_name = formData.get('market_name') as string;

    await supabase.from('prices').update({
        vegetable_name,
        price: Number(price),
        market_name,
    }).match({ id: id, user_id: user.id });

    revalidatePath('/');
}