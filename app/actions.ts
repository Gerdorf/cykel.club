"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const name = formData.get("name")?.toString();
  const birthdate = formData.get("birthdate")?.toString();
  const alias = formData.get("alias")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email og kodeord er påkrævet" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        name,
        birthdate,
        alias,
      }
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const createRouteAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const distance = formData.get("distance")?.toString();
  const elevation = formData.get("elevation")?.toString();
  const map_link = formData.get("map_link")?.toString();
  const remarks = formData.get("remarks")?.toString();
  const supabase = await createClient();

  if (!name || !distance || !elevation) {
    return { error: "Navn, længde og højdemeter mangler at blive udfyldt" };
  }

  const { error } = await supabase.from("Routes").insert([{
    name,
    distance,
    elevation,
    map_link,
    remarks,
  }]);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/ruter", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/ruter",
      "Ruten er nu blevet oprettet!",
    );
  }
};

export const updateRouteAction = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const distance = formData.get("distance")?.toString();
  const elevation = formData.get("elevation")?.toString();
  const map_link = formData.get("map_link")?.toString();
  const remarks = formData.get("remarks")?.toString();
  const supabase = await createClient();

  if (!id || !name || !distance || !elevation) {
    return { error: "Navn, længde og højdemeter mangler at blive udfyldt" };
  }

  const { data, error } = await supabase.from("Routes").update({
    name,
    distance,
    elevation,
    map_link,
    remarks,
  }).eq("id", id).select();

  console.log(data)
  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/ruter", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/ruter",
      "Ruten er nu blevet opdateret",
    );
  }
}


export const createRaceAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString()
  const supabase = await createClient();

  console.log(endDate)

  const { data: { user } } = await supabase.auth.getUser();
  if (!name) {
    return { error: "Navn mangler at blive udfyldt" };
  }

  const { error } = await supabase.from("Races").insert([{
    name,
    description,
    startDate,
    endDate,
  }]);

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/loeb", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/loeb",
      "Løbet er nu oprettet!",
    );
  }
};

export const updateRaceAction = async (formData: FormData) => {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const startDate = formData.get("startDate")?.toString();
  const endDate = formData.get("endDate")?.toString()
  const supabase = await createClient();

  if (!id || !name) {
    return { error: "Navn, start dato og slut dato mangler at blive udfyldt" };
  }

  const { data, error } = await supabase.from("Races").update({
    name,
    description,
    startDate,
    endDate,
  }).eq("id", id).select();

  console.log(data)
  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", `/loeb/${id}`, error.message);
  } else {
    return encodedRedirect(
      "success",
      `/loeb/${id}`,
      "Ruten er nu blevet opdateret",
    );
  }
}