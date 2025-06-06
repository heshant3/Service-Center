PGDMP                      }            room    17.2    17.2 ~    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    room    DATABASE     w   CREATE DATABASE room WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Tonga.1252';
    DROP DATABASE room;
                     postgres    false            �            1255    41148    update_timestamp()    FUNCTION     �   CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
 )   DROP FUNCTION public.update_timestamp();
       public               postgres    false            �            1259    24587    ActiveTokens    TABLE     �   CREATE TABLE public."ActiveTokens" (
    "tokenID" integer NOT NULL,
    "userID" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public."ActiveTokens";
       public         heap r       postgres    false            �            1259    24586    ActiveTokens_tokenID_seq    SEQUENCE     �   CREATE SEQUENCE public."ActiveTokens_tokenID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."ActiveTokens_tokenID_seq";
       public               postgres    false    224            �           0    0    ActiveTokens_tokenID_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."ActiveTokens_tokenID_seq" OWNED BY public."ActiveTokens"."tokenID";
          public               postgres    false    223            �            1259    82324    Client_EmailVerificationCodes    TABLE     �   CREATE TABLE public."Client_EmailVerificationCodes" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    code character varying(4) NOT NULL,
    created_at timestamp without time zone,
    resend_attempts integer DEFAULT 0
);
 3   DROP TABLE public."Client_EmailVerificationCodes";
       public         heap r       postgres    false            �            1259    82323 %   Client_EmailVerificationCodess_id_seq    SEQUENCE     �   ALTER TABLE public."Client_EmailVerificationCodes" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Client_EmailVerificationCodess_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    245            �            1259    32938    Client_EmailVerificationTokens    TABLE     �   CREATE TABLE public."Client_EmailVerificationTokens" (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    resend_attempts integer DEFAULT 0
);
 4   DROP TABLE public."Client_EmailVerificationTokens";
       public         heap r       postgres    false            �            1259    82308 !   Client_ForgetPasswordVerification    TABLE        CREATE TABLE public."Client_ForgetPasswordVerification" (
    email character varying(255) NOT NULL,
    reset_token character varying(255),
    reset_token_expiry timestamp without time zone,
    reset_attempts integer DEFAULT 0,
    last_reset_attempt_at timestamp without time zone
);
 7   DROP TABLE public."Client_ForgetPasswordVerification";
       public         heap r       postgres    false            �            1259    32948    Client_activeToken    TABLE     f  CREATE TABLE public."Client_activeToken" (
    id integer NOT NULL,
    clientid integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    ip_address character varying(255),
    device_details character varying(255),
    login_time character varying(255),
    device_type character varying(255)
);
 (   DROP TABLE public."Client_activeToken";
       public         heap r       postgres    false            �            1259    32947    Client_activeToken_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Client_activeToken_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."Client_activeToken_id_seq";
       public               postgres    false    234            �           0    0    Client_activeToken_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Client_activeToken_id_seq" OWNED BY public."Client_activeToken".id;
          public               postgres    false    233            �            1259    32792    Client_auth    TABLE     �   CREATE TABLE public."Client_auth" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password text,
    is_verified boolean DEFAULT false,
    google_id text
);
 !   DROP TABLE public."Client_auth";
       public         heap r       postgres    false            �            1259    32925    Client_profile    TABLE     S  CREATE TABLE public."Client_profile" (
    id integer NOT NULL,
    client_id integer NOT NULL,
    name character varying(255),
    dob date,
    address text,
    age integer,
    gender character varying(10),
    mobile character varying(50),
    nic character varying(100),
    image_url text,
    nationality character varying(70)
);
 $   DROP TABLE public."Client_profile";
       public         heap r       postgres    false            �            1259    32924    Client_profile_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Client_profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Client_profile_id_seq";
       public               postgres    false    231            �           0    0    Client_profile_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Client_profile_id_seq" OWNED BY public."Client_profile".id;
          public               postgres    false    230            �            1259    24597    EmailChangeOTP    TABLE     �   CREATE TABLE public."EmailChangeOTP" (
    email character varying(255) NOT NULL,
    otp character varying(10) NOT NULL,
    created_at timestamp without time zone,
    attempts integer DEFAULT 0 NOT NULL
);
 $   DROP TABLE public."EmailChangeOTP";
       public         heap r       postgres    false            �            1259    16465    Hotel Table    TABLE       CREATE TABLE public."Hotel Table" (
    "hotelID" integer NOT NULL,
    "userID" integer,
    "hotelName" character varying(255),
    "hotelAddress" text,
    "roomCount" integer,
    "paymentMethods" text,
    city character varying(255),
    review integer,
    "mapLink" text
);
 !   DROP TABLE public."Hotel Table";
       public         heap r       postgres    false            �            1259    16468    Hotel Table_hotelID_seq    SEQUENCE     �   ALTER TABLE public."Hotel Table" ALTER COLUMN "hotelID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Hotel Table_hotelID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    219            �            1259    82354 "   HotelOwner_EmailVerificationTokens    TABLE     %  CREATE TABLE public."HotelOwner_EmailVerificationTokens" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    verification_token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    attempts integer DEFAULT 0 NOT NULL
);
 8   DROP TABLE public."HotelOwner_EmailVerificationTokens";
       public         heap r       postgres    false            �            1259    82353 )   HotelOwner_EmailVerificationTokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public."HotelOwner_EmailVerificationTokens_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."HotelOwner_EmailVerificationTokens_id_seq";
       public               postgres    false    247            �           0    0 )   HotelOwner_EmailVerificationTokens_id_seq    SEQUENCE OWNED BY     {   ALTER SEQUENCE public."HotelOwner_EmailVerificationTokens_id_seq" OWNED BY public."HotelOwner_EmailVerificationTokens".id;
          public               postgres    false    246            �            1259    82365 %   HotelOwner_ForgetPasswordVerification    TABLE     (  CREATE TABLE public."HotelOwner_ForgetPasswordVerification" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    verification_token character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    attempts integer DEFAULT 0 NOT NULL
);
 ;   DROP TABLE public."HotelOwner_ForgetPasswordVerification";
       public         heap r       postgres    false            �            1259    82364 ,   HotelOwner_ForgetPasswordVerification_id_seq    SEQUENCE     �   CREATE SEQUENCE public."HotelOwner_ForgetPasswordVerification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public."HotelOwner_ForgetPasswordVerification_id_seq";
       public               postgres    false    249            �           0    0 ,   HotelOwner_ForgetPasswordVerification_id_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."HotelOwner_ForgetPasswordVerification_id_seq" OWNED BY public."HotelOwner_ForgetPasswordVerification".id;
          public               postgres    false    248            �            1259    73789 
   HotelRules    TABLE     �  CREATE TABLE public."HotelRules" (
    id integer NOT NULL,
    hotel_id integer,
    check_in text,
    check_out text,
    cancellation text,
    age_restriction boolean DEFAULT false,
    smoking_prohibited boolean DEFAULT true,
    pet_allowed boolean DEFAULT false,
    age_restriction_details text,
    smoking_policy_details text,
    pet_policy_details text,
    room_problems text
);
     DROP TABLE public."HotelRules";
       public         heap r       postgres    false            �            1259    57367    Reviews    TABLE     !  CREATE TABLE public."Reviews" (
    id integer DEFAULT nextval('public."Client_profile_id_seq"'::regclass) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    booking_id text NOT NULL,
    hotel_id integer NOT NULL,
    client_id integer NOT NULL,
    "Room Safety" integer,
    "Room Privacy" integer,
    "Room Cleanness" integer,
    "Bathroom Cleanness" integer,
    "Bed Cleanness" integer,
    "Value of Money" integer,
    "Staff" integer,
    overall_rating double precision,
    comment text
);
    DROP TABLE public."Reviews";
       public         heap r       postgres    false    230            �            1259    16490 
   Room Table    TABLE     E  CREATE TABLE public."Room Table" (
    "roomID" integer NOT NULL,
    "hotelID" integer,
    "roomType" character varying(255),
    amenities text,
    review integer,
    images text,
    "extraPrice" integer,
    guest character varying(50),
    "roomSize" integer,
    "bedType" character varying,
    description text
);
     DROP TABLE public."Room Table";
       public         heap r       postgres    false            �            1259    24580    Room Table_roomID_seq    SEQUENCE     �   ALTER TABLE public."Room Table" ALTER COLUMN "roomID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Room Table_roomID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    221            �            1259    32780 	   RoomPrice    TABLE     �   CREATE TABLE public."RoomPrice" (
    "priceID" integer NOT NULL,
    "roomID" integer NOT NULL,
    pricing integer,
    duration character varying(255)
);
    DROP TABLE public."RoomPrice";
       public         heap r       postgres    false            �            1259    32779    RoomPrice_priceID_seq    SEQUENCE     �   CREATE SEQUENCE public."RoomPrice_priceID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."RoomPrice_priceID_seq";
       public               postgres    false    227            �           0    0    RoomPrice_priceID_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."RoomPrice_priceID_seq" OWNED BY public."RoomPrice"."priceID";
          public               postgres    false    226            �            1259    16400 
   User Table    TABLE     �   CREATE TABLE public."User Table" (
    "userID" integer NOT NULL,
    name text,
    email text,
    mobile text,
    address text,
    dob date,
    nationality character varying(255),
    password text,
    is_verified boolean
);
     DROP TABLE public."User Table";
       public         heap r       postgres    false            �            1259    16405    User Table_UserID_seq    SEQUENCE     �   ALTER TABLE public."User Table" ALTER COLUMN "userID" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."User Table_UserID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public               postgres    false    217            �            1259    65612    Wishlist    TABLE     |   CREATE TABLE public."Wishlist" (
    id integer NOT NULL,
    client_id integer NOT NULL,
    "hotelID" integer NOT NULL
);
    DROP TABLE public."Wishlist";
       public         heap r       postgres    false            �            1259    65644    Wishlist_id_seq    SEQUENCE     �   ALTER TABLE public."Wishlist" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Wishlist_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
            public               postgres    false    237            �            1259    41120    bookings    TABLE     �  CREATE TABLE public.bookings (
    booking_id text DEFAULT ('BK-'::text || upper(substr((gen_random_uuid())::text, 1, 12))) NOT NULL,
    client_id integer NOT NULL,
    hotel_id integer NOT NULL,
    room_id integer NOT NULL,
    booking_date date,
    booking_time time without time zone,
    duration character varying(50),
    status character varying(10) DEFAULT 'Pending'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_price integer,
    room_type character varying(100),
    guest character varying(50),
    client_name character varying(100),
    client_nic character varying(50),
    client_mobile character varying,
    client_address text,
    canceled_by character varying,
    overall_rating integer,
    meal_plane character varying(255),
    booking_daterange character varying(255),
    client_nationality character varying(255),
    CONSTRAINT bookings_status_check CHECK (((status)::text = ANY ((ARRAY['Pending'::character varying, 'Completed'::character varying, 'Cancelled'::character varying, 'Confirmed'::character varying, 'Checked-In'::character varying])::text[])))
);
    DROP TABLE public.bookings;
       public         heap r       postgres    false            �            1259    32791    client_auth_id_seq    SEQUENCE     �   CREATE SEQUENCE public.client_auth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.client_auth_id_seq;
       public               postgres    false    229            �           0    0    client_auth_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.client_auth_id_seq OWNED BY public."Client_auth".id;
          public               postgres    false    228            �            1259    73788    hotelrules_id_seq    SEQUENCE     �   CREATE SEQUENCE public.hotelrules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.hotelrules_id_seq;
       public               postgres    false    240            �           0    0    hotelrules_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.hotelrules_id_seq OWNED BY public."HotelRules".id;
          public               postgres    false    239            �            1259    82288    longTermPrice    TABLE     �   CREATE TABLE public."longTermPrice" (
    id integer NOT NULL,
    "roomID" integer NOT NULL,
    "roomOnly" integer,
    "fullBoard" integer,
    "halfBoard" integer,
    "bedAndBreakfast" integer,
    "allInclusive" integer
);
 #   DROP TABLE public."longTermPrice";
       public         heap r       postgres    false            �            1259    82287    longTermPrice_id_seq    SEQUENCE     �   CREATE SEQUENCE public."longTermPrice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."longTermPrice_id_seq";
       public               postgres    false    242            �           0    0    longTermPrice_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."longTermPrice_id_seq" OWNED BY public."longTermPrice".id;
          public               postgres    false    241            �           2604    24590    ActiveTokens tokenID    DEFAULT     �   ALTER TABLE ONLY public."ActiveTokens" ALTER COLUMN "tokenID" SET DEFAULT nextval('public."ActiveTokens_tokenID_seq"'::regclass);
 G   ALTER TABLE public."ActiveTokens" ALTER COLUMN "tokenID" DROP DEFAULT;
       public               postgres    false    223    224    224            �           2604    32951    Client_activeToken id    DEFAULT     �   ALTER TABLE ONLY public."Client_activeToken" ALTER COLUMN id SET DEFAULT nextval('public."Client_activeToken_id_seq"'::regclass);
 F   ALTER TABLE public."Client_activeToken" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    234    234            �           2604    32795    Client_auth id    DEFAULT     r   ALTER TABLE ONLY public."Client_auth" ALTER COLUMN id SET DEFAULT nextval('public.client_auth_id_seq'::regclass);
 ?   ALTER TABLE public."Client_auth" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    229    229            �           2604    32928    Client_profile id    DEFAULT     z   ALTER TABLE ONLY public."Client_profile" ALTER COLUMN id SET DEFAULT nextval('public."Client_profile_id_seq"'::regclass);
 B   ALTER TABLE public."Client_profile" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    231    231            �           2604    82357 %   HotelOwner_EmailVerificationTokens id    DEFAULT     �   ALTER TABLE ONLY public."HotelOwner_EmailVerificationTokens" ALTER COLUMN id SET DEFAULT nextval('public."HotelOwner_EmailVerificationTokens_id_seq"'::regclass);
 V   ALTER TABLE public."HotelOwner_EmailVerificationTokens" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    246    247    247            �           2604    82368 (   HotelOwner_ForgetPasswordVerification id    DEFAULT     �   ALTER TABLE ONLY public."HotelOwner_ForgetPasswordVerification" ALTER COLUMN id SET DEFAULT nextval('public."HotelOwner_ForgetPasswordVerification_id_seq"'::regclass);
 Y   ALTER TABLE public."HotelOwner_ForgetPasswordVerification" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    249    248    249            �           2604    73792    HotelRules id    DEFAULT     p   ALTER TABLE ONLY public."HotelRules" ALTER COLUMN id SET DEFAULT nextval('public.hotelrules_id_seq'::regclass);
 >   ALTER TABLE public."HotelRules" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    239    240    240            �           2604    32783    RoomPrice priceID    DEFAULT     |   ALTER TABLE ONLY public."RoomPrice" ALTER COLUMN "priceID" SET DEFAULT nextval('public."RoomPrice_priceID_seq"'::regclass);
 D   ALTER TABLE public."RoomPrice" ALTER COLUMN "priceID" DROP DEFAULT;
       public               postgres    false    227    226    227            �           2604    82291    longTermPrice id    DEFAULT     x   ALTER TABLE ONLY public."longTermPrice" ALTER COLUMN id SET DEFAULT nextval('public."longTermPrice_id_seq"'::regclass);
 A   ALTER TABLE public."longTermPrice" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    241    242    242            �          0    24587    ActiveTokens 
   TABLE DATA           Q   COPY public."ActiveTokens" ("tokenID", "userID", token, "createdAt") FROM stdin;
    public               postgres    false    224   �       �          0    82324    Client_EmailVerificationCodes 
   TABLE DATA           g   COPY public."Client_EmailVerificationCodes" (id, email, code, created_at, resend_attempts) FROM stdin;
    public               postgres    false    245   I�       �          0    32938    Client_EmailVerificationTokens 
   TABLE DATA           e   COPY public."Client_EmailVerificationTokens" (email, token, created_at, resend_attempts) FROM stdin;
    public               postgres    false    232   f�       �          0    82308 !   Client_ForgetPasswordVerification 
   TABLE DATA           �   COPY public."Client_ForgetPasswordVerification" (email, reset_token, reset_token_expiry, reset_attempts, last_reset_attempt_at) FROM stdin;
    public               postgres    false    243   ��       �          0    32948    Client_activeToken 
   TABLE DATA           �   COPY public."Client_activeToken" (id, clientid, token, "createdAt", ip_address, device_details, login_time, device_type) FROM stdin;
    public               postgres    false    234   ��       �          0    32792    Client_auth 
   TABLE DATA           T   COPY public."Client_auth" (id, email, password, is_verified, google_id) FROM stdin;
    public               postgres    false    229   ,�       �          0    32925    Client_profile 
   TABLE DATA              COPY public."Client_profile" (id, client_id, name, dob, address, age, gender, mobile, nic, image_url, nationality) FROM stdin;
    public               postgres    false    231   a�       �          0    24597    EmailChangeOTP 
   TABLE DATA           L   COPY public."EmailChangeOTP" (email, otp, created_at, attempts) FROM stdin;
    public               postgres    false    225   �       �          0    16465    Hotel Table 
   TABLE DATA           �   COPY public."Hotel Table" ("hotelID", "userID", "hotelName", "hotelAddress", "roomCount", "paymentMethods", city, review, "mapLink") FROM stdin;
    public               postgres    false    219   �       �          0    82354 "   HotelOwner_EmailVerificationTokens 
   TABLE DATA           s   COPY public."HotelOwner_EmailVerificationTokens" (id, email, verification_token, created_at, attempts) FROM stdin;
    public               postgres    false    247   S�       �          0    82365 %   HotelOwner_ForgetPasswordVerification 
   TABLE DATA           v   COPY public."HotelOwner_ForgetPasswordVerification" (id, email, verification_token, created_at, attempts) FROM stdin;
    public               postgres    false    249   p�       �          0    73789 
   HotelRules 
   TABLE DATA           �   COPY public."HotelRules" (id, hotel_id, check_in, check_out, cancellation, age_restriction, smoking_prohibited, pet_allowed, age_restriction_details, smoking_policy_details, pet_policy_details, room_problems) FROM stdin;
    public               postgres    false    240   ��       �          0    57367    Reviews 
   TABLE DATA           �   COPY public."Reviews" (id, created_at, booking_id, hotel_id, client_id, "Room Safety", "Room Privacy", "Room Cleanness", "Bathroom Cleanness", "Bed Cleanness", "Value of Money", "Staff", overall_rating, comment) FROM stdin;
    public               postgres    false    236   B�       �          0    16490 
   Room Table 
   TABLE DATA           �   COPY public."Room Table" ("roomID", "hotelID", "roomType", amenities, review, images, "extraPrice", guest, "roomSize", "bedType", description) FROM stdin;
    public               postgres    false    221   ��       �          0    32780 	   RoomPrice 
   TABLE DATA           M   COPY public."RoomPrice" ("priceID", "roomID", pricing, duration) FROM stdin;
    public               postgres    false    227   ��       �          0    16400 
   User Table 
   TABLE DATA           w   COPY public."User Table" ("userID", name, email, mobile, address, dob, nationality, password, is_verified) FROM stdin;
    public               postgres    false    217   ��       �          0    65612    Wishlist 
   TABLE DATA           >   COPY public."Wishlist" (id, client_id, "hotelID") FROM stdin;
    public               postgres    false    237   �       �          0    41120    bookings 
   TABLE DATA           9  COPY public.bookings (booking_id, client_id, hotel_id, room_id, booking_date, booking_time, duration, status, created_at, updated_at, total_price, room_type, guest, client_name, client_nic, client_mobile, client_address, canceled_by, overall_rating, meal_plane, booking_daterange, client_nationality) FROM stdin;
    public               postgres    false    235   ;�       �          0    82288    longTermPrice 
   TABLE DATA           �   COPY public."longTermPrice" (id, "roomID", "roomOnly", "fullBoard", "halfBoard", "bedAndBreakfast", "allInclusive") FROM stdin;
    public               postgres    false    242   ��       �           0    0    ActiveTokens_tokenID_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public."ActiveTokens_tokenID_seq"', 182, true);
          public               postgres    false    223            �           0    0 %   Client_EmailVerificationCodess_id_seq    SEQUENCE SET     U   SELECT pg_catalog.setval('public."Client_EmailVerificationCodess_id_seq"', 8, true);
          public               postgres    false    244            �           0    0    Client_activeToken_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Client_activeToken_id_seq"', 168, true);
          public               postgres    false    233            �           0    0    Client_profile_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Client_profile_id_seq"', 185, true);
          public               postgres    false    230            �           0    0    Hotel Table_hotelID_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Hotel Table_hotelID_seq"', 81, true);
          public               postgres    false    220            �           0    0 )   HotelOwner_EmailVerificationTokens_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public."HotelOwner_EmailVerificationTokens_id_seq"', 2, true);
          public               postgres    false    246            �           0    0 ,   HotelOwner_ForgetPasswordVerification_id_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."HotelOwner_ForgetPasswordVerification_id_seq"', 26, true);
          public               postgres    false    248            �           0    0    Room Table_roomID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Room Table_roomID_seq"', 494, true);
          public               postgres    false    222            �           0    0    RoomPrice_priceID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."RoomPrice_priceID_seq"', 372, true);
          public               postgres    false    226            �           0    0    User Table_UserID_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."User Table_UserID_seq"', 240, true);
          public               postgres    false    218            �           0    0    Wishlist_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Wishlist_id_seq"', 44, true);
          public               postgres    false    238            �           0    0    client_auth_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.client_auth_id_seq', 50, true);
          public               postgres    false    228            �           0    0    hotelrules_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.hotelrules_id_seq', 28, true);
          public               postgres    false    239            �           0    0    longTermPrice_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."longTermPrice_id_seq"', 21, true);
          public               postgres    false    241            �           2606    24595    ActiveTokens ActiveTokens_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."ActiveTokens"
    ADD CONSTRAINT "ActiveTokens_pkey" PRIMARY KEY ("tokenID");
 L   ALTER TABLE ONLY public."ActiveTokens" DROP CONSTRAINT "ActiveTokens_pkey";
       public                 postgres    false    224            �           2606    82330 A   Client_EmailVerificationCodes Client_EmailVerificationCodess_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Client_EmailVerificationCodes"
    ADD CONSTRAINT "Client_EmailVerificationCodess_pkey" PRIMARY KEY (id);
 o   ALTER TABLE ONLY public."Client_EmailVerificationCodes" DROP CONSTRAINT "Client_EmailVerificationCodess_pkey";
       public                 postgres    false    245            �           2606    82315 H   Client_ForgetPasswordVerification Client_ForgetPasswordVerification_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Client_ForgetPasswordVerification"
    ADD CONSTRAINT "Client_ForgetPasswordVerification_pkey" PRIMARY KEY (email);
 v   ALTER TABLE ONLY public."Client_ForgetPasswordVerification" DROP CONSTRAINT "Client_ForgetPasswordVerification_pkey";
       public                 postgres    false    243            �           2606    32956 *   Client_activeToken Client_activeToken_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."Client_activeToken"
    ADD CONSTRAINT "Client_activeToken_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Client_activeToken" DROP CONSTRAINT "Client_activeToken_pkey";
       public                 postgres    false    234            �           2606    32932 "   Client_profile Client_profile_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Client_profile"
    ADD CONSTRAINT "Client_profile_pkey" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Client_profile" DROP CONSTRAINT "Client_profile_pkey";
       public                 postgres    false    231            �           2606    24601 "   EmailChangeOTP EmailChangeOTP_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."EmailChangeOTP"
    ADD CONSTRAINT "EmailChangeOTP_pkey" PRIMARY KEY (email, otp);
 P   ALTER TABLE ONLY public."EmailChangeOTP" DROP CONSTRAINT "EmailChangeOTP_pkey";
       public                 postgres    false    225    225            �           2606    32945 ;   Client_EmailVerificationTokens EmailVerificationTokens_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Client_EmailVerificationTokens"
    ADD CONSTRAINT "EmailVerificationTokens_pkey" PRIMARY KEY (token);
 i   ALTER TABLE ONLY public."Client_EmailVerificationTokens" DROP CONSTRAINT "EmailVerificationTokens_pkey";
       public                 postgres    false    232            �           2606    16507    Hotel Table Hotel Table_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public."Hotel Table"
    ADD CONSTRAINT "Hotel Table_pkey" PRIMARY KEY ("hotelID");
 J   ALTER TABLE ONLY public."Hotel Table" DROP CONSTRAINT "Hotel Table_pkey";
       public                 postgres    false    219            �           2606    82362 J   HotelOwner_EmailVerificationTokens HotelOwner_EmailVerificationTokens_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."HotelOwner_EmailVerificationTokens"
    ADD CONSTRAINT "HotelOwner_EmailVerificationTokens_pkey" PRIMARY KEY (id);
 x   ALTER TABLE ONLY public."HotelOwner_EmailVerificationTokens" DROP CONSTRAINT "HotelOwner_EmailVerificationTokens_pkey";
       public                 postgres    false    247            �           2606    82376 U   HotelOwner_ForgetPasswordVerification HotelOwner_ForgetPasswordVerification_email_key 
   CONSTRAINT     �   ALTER TABLE ONLY public."HotelOwner_ForgetPasswordVerification"
    ADD CONSTRAINT "HotelOwner_ForgetPasswordVerification_email_key" UNIQUE (email);
 �   ALTER TABLE ONLY public."HotelOwner_ForgetPasswordVerification" DROP CONSTRAINT "HotelOwner_ForgetPasswordVerification_email_key";
       public                 postgres    false    249            �           2606    82374 P   HotelOwner_ForgetPasswordVerification HotelOwner_ForgetPasswordVerification_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."HotelOwner_ForgetPasswordVerification"
    ADD CONSTRAINT "HotelOwner_ForgetPasswordVerification_pkey" PRIMARY KEY (id);
 ~   ALTER TABLE ONLY public."HotelOwner_ForgetPasswordVerification" DROP CONSTRAINT "HotelOwner_ForgetPasswordVerification_pkey";
       public                 postgres    false    249            �           2606    16504    Room Table Room Table_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."Room Table"
    ADD CONSTRAINT "Room Table_pkey" PRIMARY KEY ("roomID");
 H   ALTER TABLE ONLY public."Room Table" DROP CONSTRAINT "Room Table_pkey";
       public                 postgres    false    221            �           2606    32785    RoomPrice RoomPrice_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."RoomPrice"
    ADD CONSTRAINT "RoomPrice_pkey" PRIMARY KEY ("priceID");
 F   ALTER TABLE ONLY public."RoomPrice" DROP CONSTRAINT "RoomPrice_pkey";
       public                 postgres    false    227            �           2606    16407    User Table User Table_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."User Table"
    ADD CONSTRAINT "User Table_pkey" PRIMARY KEY ("userID");
 H   ALTER TABLE ONLY public."User Table" DROP CONSTRAINT "User Table_pkey";
       public                 postgres    false    217            �           2606    65649    Wishlist Wishlist_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Wishlist_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Wishlist" DROP CONSTRAINT "Wishlist_pkey";
       public                 postgres    false    237            �           2606    41132    bookings bookings_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public                 postgres    false    235            �           2606    32801 !   Client_auth client_auth_email_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."Client_auth"
    ADD CONSTRAINT client_auth_email_key UNIQUE (email);
 M   ALTER TABLE ONLY public."Client_auth" DROP CONSTRAINT client_auth_email_key;
       public                 postgres    false    229            �           2606    32799    Client_auth client_auth_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Client_auth"
    ADD CONSTRAINT client_auth_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Client_auth" DROP CONSTRAINT client_auth_pkey;
       public                 postgres    false    229            �           2606    73799    HotelRules hotelrules_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."HotelRules"
    ADD CONSTRAINT hotelrules_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."HotelRules" DROP CONSTRAINT hotelrules_pkey;
       public                 postgres    false    240            �           2606    82293     longTermPrice longTermPrice_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."longTermPrice"
    ADD CONSTRAINT "longTermPrice_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."longTermPrice" DROP CONSTRAINT "longTermPrice_pkey";
       public                 postgres    false    242            �           2606    57379    Reviews reviews_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT reviews_pkey;
       public                 postgres    false    236            �           2606    82332 *   Client_EmailVerificationCodes unique_email 
   CONSTRAINT     h   ALTER TABLE ONLY public."Client_EmailVerificationCodes"
    ADD CONSTRAINT unique_email UNIQUE (email);
 V   ALTER TABLE ONLY public."Client_EmailVerificationCodes" DROP CONSTRAINT unique_email;
       public                 postgres    false    245                       2620    41149    bookings set_timestamp    TRIGGER     w   CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();
 /   DROP TRIGGER set_timestamp ON public.bookings;
       public               postgres    false    235    250                       2606    65650    Wishlist Clienk_FK    FK CONSTRAINT     �   ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Clienk_FK" FOREIGN KEY (client_id) REFERENCES public."Client_auth"(id) NOT VALID;
 @   ALTER TABLE ONLY public."Wishlist" DROP CONSTRAINT "Clienk_FK";
       public               postgres    false    4827    237    229                       2606    65655    Wishlist Hotel_FK    FK CONSTRAINT     �   ALTER TABLE ONLY public."Wishlist"
    ADD CONSTRAINT "Hotel_FK" FOREIGN KEY ("hotelID") REFERENCES public."Hotel Table"("hotelID") NOT VALID;
 ?   ALTER TABLE ONLY public."Wishlist" DROP CONSTRAINT "Hotel_FK";
       public               postgres    false    219    4815    237            �           2606    32786    RoomPrice RoomPrice_roomID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."RoomPrice"
    ADD CONSTRAINT "RoomPrice_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room Table"("roomID") ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."RoomPrice" DROP CONSTRAINT "RoomPrice_roomID_fkey";
       public               postgres    false    4817    227    221            �           2606    73815    Hotel Table User_hotel_Id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."Hotel Table"
    ADD CONSTRAINT "User_hotel_Id_fk" FOREIGN KEY ("userID") REFERENCES public."User Table"("userID") NOT VALID;
 J   ALTER TABLE ONLY public."Hotel Table" DROP CONSTRAINT "User_hotel_Id_fk";
       public               postgres    false    4813    217    219            �           2606    57383    Reviews booking_id_FK    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "booking_id_FK" FOREIGN KEY (booking_id) REFERENCES public.bookings(booking_id) NOT VALID;
 C   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "booking_id_FK";
       public               postgres    false    236    4835    235                        2606    57393    Reviews client_id_FK    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "client_id_FK" FOREIGN KEY (client_id) REFERENCES public."Client_auth"(id) NOT VALID;
 B   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "client_id_FK";
       public               postgres    false    236    4827    229            �           2606    32933 ,   Client_profile client_profile_client_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Client_profile"
    ADD CONSTRAINT client_profile_client_id_fkey FOREIGN KEY (client_id) REFERENCES public."Client_auth"(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."Client_profile" DROP CONSTRAINT client_profile_client_id_fkey;
       public               postgres    false    4827    229    231            �           2606    41138    bookings fk_hotel    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_hotel FOREIGN KEY (hotel_id) REFERENCES public."Hotel Table"("hotelID") ON DELETE CASCADE;
 ;   ALTER TABLE ONLY public.bookings DROP CONSTRAINT fk_hotel;
       public               postgres    false    235    4815    219                       2606    73810    HotelRules fk_hotel    FK CONSTRAINT     �   ALTER TABLE ONLY public."HotelRules"
    ADD CONSTRAINT fk_hotel FOREIGN KEY (hotel_id) REFERENCES public."Hotel Table"("hotelID") NOT VALID;
 ?   ALTER TABLE ONLY public."HotelRules" DROP CONSTRAINT fk_hotel;
       public               postgres    false    240    4815    219            �           2606    41143    bookings fk_room    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_room FOREIGN KEY (room_id) REFERENCES public."Room Table"("roomID") ON DELETE CASCADE;
 :   ALTER TABLE ONLY public.bookings DROP CONSTRAINT fk_room;
       public               postgres    false    235    221    4817            �           2606    41133    bookings fk_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT fk_user FOREIGN KEY (client_id) REFERENCES public."Client_auth"(id) ON DELETE CASCADE;
 :   ALTER TABLE ONLY public.bookings DROP CONSTRAINT fk_user;
       public               postgres    false    235    4827    229                       2606    57388    Reviews hotel_id_FK    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "hotel_id_FK" FOREIGN KEY (hotel_id) REFERENCES public."Hotel Table"("hotelID") NOT VALID;
 A   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "hotel_id_FK";
       public               postgres    false    4815    236    219            �           2606    16526    Room Table hotel_room_Id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public."Room Table"
    ADD CONSTRAINT "hotel_room_Id_fk" FOREIGN KEY ("hotelID") REFERENCES public."Hotel Table"("hotelID") ON DELETE RESTRICT NOT VALID;
 I   ALTER TABLE ONLY public."Room Table" DROP CONSTRAINT "hotel_room_Id_fk";
       public               postgres    false    4815    221    219                       2606    82294 '   longTermPrice longTermPrice_roomID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."longTermPrice"
    ADD CONSTRAINT "longTermPrice_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES public."Room Table"("roomID") ON DELETE CASCADE;
 U   ALTER TABLE ONLY public."longTermPrice" DROP CONSTRAINT "longTermPrice_roomID_fkey";
       public               postgres    false    4817    242    221            �   F  x����n�J���*z�ٰ8���� [7Y�Tp�bE����Ь����Qc'���7�|P&O��]3��arpc+l-HVa�=)�-�:^�>V�LP���{p���zu���byM[�����A�������3&�Ʋ��4ت�s��46��v�l�������|6�#G9�C{�d��-�@R��/P�D�aE�1F�<CY}BP��v�hh�?��46�/X]���i>�����<c+��k��ԛ-ƙ�N9���74Ѹ AeY��������tm���t�lO����Ug��=���N6��N ������b�4�3i�BI�f�03�A������߼5�*��Ut}/
�(����ک��ԏ,<x����פ�����&�@ �]��	a�W�6whv�vyt�8A���="e��Ӭ��*�Ӿ��U��g*-IX�m�� ��-�tbY�����2G�&���74�-G������#��#\��Ɍ��DYd�GV�+7���x�V�% $b��C|�18:p��8R��cXFu��}VĽ`6e��3oa�7��\�y���%�G���U#�z�D��P$^�ߡ�;4��,����N��t1R��77��M?��t�N5��4���~����5����@�0�E���7��ݔ��e������'U�G�+k�����x��>T�����Y�2�r )�FQ����!5�
"R�C+�D/��?�neT.%����kX�g�-�ŇuD{�52��a�壜���dޡE�!��vÃ<��W�M[^�J)����J���{�q���DL���''ؘn�����=�'M�����́����v�A��T��(� �|�4�:���=�hz�KKv�l8�&��͒���!��!�ES�������/�n�;����ٓ��ƷS��-��*�b$���2;ʎkߡ�:��G�_��Sڅ?ЌOi#R�Py���9�[9*��;d5���`���yv��\1׳��/�.l>�T�z���C��dBǰ�W������ac���ޯ܏f�,'��^V7���?��"��r���n��@C�!ޏ������[5c      �      x������ � �      �      x������ � �      �      x������ � �      �   |  x���뎪H��O����U���*(h�I�xD���S�ݞ�zf2���Ġ���j��*(��K�����3��5'Ӡ�kGmk���&ia<rkm&�^s��V��_���E��<�lπ��D�a�����:т���L���퐥)�V�{l�A��G����b�v����V�?�Z�J �H�eH�H(b��(�T[vѢ�( �w�����wɱA~����ȫ�U�n��qT��^�(�t�趓�Ǧ�̰�+ozލ]��m�ZǀN݂�>m�:k�#�ڎ�$[��v��M#� �@(�RI���m��iZhӆ��i�C���7���0�U�I7������ڴE&Wih�U��-0�F�V0�}i*�* Kr��Ȑ %*P�	A�y����v~����3
v����-{�(�]O{���GV��,�8h�I�]m�߾NӮ8��=0O�zd���]��������|W���H��x���@�'�ϊ��m*$T"�{�n?cޮ����Aq����j[��0i����#_B���Rs2�o�<`��%���Z���w�`��M��Ӱ�=�o[`��d��J��]zN,�,Jv��&+I��d��3��0��������>c��ȓdu�����͖�N�l@˝^q�b����#�����GR߻�/ W5Q�Q�q)/ �G�;Z$.�U��AG�:�1��ح�-&R��i�`Ҕ�Ճ�����Ţ��zLܯ����C��V�nb�� ��g�\=s�-��������5�ݎt::X��Q}��iT�ڵ%�@��"E�;��}��i��h�&>�!�0��Vb�C��Ӡ���s�H&��I�G�֙�j��_՝��1E�yQ@��4���7�
��*��~�������y{i/���½�2�J���*g�����bt9�T?���ya��X�7��_����$Xp$X�Y�pO5�0�\����Y�M��D;yu��Qcf��ǭ�jZ�T� �Mx$�x.��+��	��y�h�4$�����4�9c��j+O׈���렾�ϒ�r�����F�	��0+,��V(l�|R?n�z����A�Z��q=�ֺ?N!����]�]S��F�V���R'VH~F �PH>��x� ���>ԟ��ON�1��ɫ�X��g4�η�U����,[{#!hT�׬K'����D\(%����DT�4虙�s5�NOu�A����%ӕ,�b��3:j����5�X�%6F�?W��AY!T��Q	 �OO�����?0���w���R0T�) �s
�Wo�ES�6�F�e�tCk���Vg��6,�?�l��D%D��� 	������~P�[xyy�����      �   %  x�m�ˎ�@�5>G�&A���Nl/�\����DnB!B
O?݉=3��?��� 3yҡ�$`�aTTl|�̛pz�7�_y���w��Up ��
�~z��B{��b����gEǍ#��|Z�1�ψ�׺�������9N� '	" �4������3��LSZs4�6!I�T�l���T�Qr��[ȝ/����3��������"�T|kZ�6b$�4��랩�I�uR����Bm���~�����	lq}��HV��Rg����	7�L�M�]�Ѱg�湴�d�F-"�F%�h�ک��}?4�^�24Mڄ��\K��hP�%�.#^(��RrE����}�*G5��W�)�R� ���u��-#����?"+j�}���q7\A][s������RU$�?.���a�[����jN�6LX9���G,����Zx2�Ky4b�(���Y��'��b�[�?yP?��[�Æ4\��pEwDWx1�����!�����]�o���{|E�.��$�Hiy��f��/��uH#U�0��a��A��I��Ov2���n�D      �   w  x����n� ���)�w<0�d�M%���4�&RtmӘ1��3��&�Fj��"�H���=�J�x���Q%���y����m��u�f���|흃Ч�ޯ�� !��F_T)%��T!%)�T�=�EeL��;�.Mh:���$�!L�!�a8.��n]X�~�.�H�޶�,���ɑ�tȴ6ִ��F��O��c�&L*ˢ�J�����'g=t�����QY#.ѵ^zp�WLf\��[�k�O�&�J��)� ��X���X���P&/+Y?|~b.Sb�XY��b�������ׂ��|?�� .��@��|�;e�BQ�]J�u1��^�d�a�� Q� ��6E?��x�Hf�Bㆃ3�oz�I}���Ͳ�/� ��      �      x������ � �      �   >  x��U�n�8}���O�R�&)Q$(�4�&���6�}[��F/%YH�~G��Xi����Y�s�̙�8"B�2(����k��7�^{W�-=[%M?�O�aU�yS�K�����e=�g]6�ˡpw�N�oIJ9�N����3+$$�%�|�ĜnȲ���[ԍ����mF��n!oZ &�ExJ���<�9�P��]�g	"����a2��g(n�Ą�1]Z׻��٬m��,�����|�î�U�:����{�������M<UFE|���H��4��!��ɥǳ)�t]fe�*�4�!o���no'����)��ܸ
K�CU[��Jɰ�D=5
�Hr�������%d����?�pr�!�(	;�Õ���WO��t��V������b��d��tea��>T������󮅂^t�;�G<G�h��UE�����ͦ�	K(��0��@s�t�Q�\�oUkk����z�Cqf(�k��A��L������&	B��	�ՔE���QK�2��[K��.���9ʦ�Ǻ��n~O%B�P�1$����D��y������f��~Oi�� ��0��S +#��<V)3S����WP �����֖5Ԯ,z��q?{Yv�'��(E�Q�{�p�L�ppB�`ütN8I��IZت�5����չ�qE��_]U�"S$6�=h�����#.��8�0�=�'N�`hNŶ��д����N�a��;���>H��B�1Zq6�.�L�{�!vM��9��V5�k���8�'����	^/m'�ǅ^5G�h?�8�c��D�^);�C.E,�@�6b���0ó�����4�Qs�      �      x������ � �      �      x������ � �      �   �   x�}�I�0E�?��	*��}���M�P��p�����ϖ<}��e��Ͻx�%i�a�g{u$�ķ/������a#�:�K&�g�v�V׹9�h�+Yf�Ɇ�)�R#3�eA+ ɝ��1�#&�'�fVE�J��/?���M��;��+x�T����)����N9      �   V   x��-�0P��\`K�u�Ǳ0�Cc�d� /y����<)W���k.��6������Rĉ���������i�����^      �   �
  x��Zю�6}�|_���HI��oI�i���l&��@��(��,j(ɶ�G��c{)�{Ɠ���H0�%���9��K�#ᄒ����r������DoE��S����)�U��݊���I޶u󯛛żX6Re��e\�M��MW�H4�:�7M�������h.����R�7�ne9S����d7��`�a?p)sp�uJ%����w��:���L}¸2�z��|�	�q��#<�bճ���.3��s}��x�{�<ѫ��"��O�0'.�:ٴ��u'��2�V&�ߐ)�@P#Я_��']U@ۼ�]�O�<
�b��R�9�5�jѽJ$`�7FN>�1�9�,��������tC�bQk=no��e��[��.CwZU�٨ʆ����]�z���U�8*XK�{{΍<�>�`!u�bcb#j���M/�`J���mz�(+��;��W㺡�7K�{0��ǈ�CקӉ�8���Q����? p`�(c]��wa�	��M�yk��.RN��)��[���V'=j��9����ޓ}O�O".P��K�� O�H�ja��u/�Ź�����,x��,U,���!���m+���QS�MpB�!;0��=��$RE�:3?r��c��񤨃��~p���v@<J7iM�h����Q#��D�3��*��4�~�hD� �0l��\����;�lų����l-����(廖Oh�8�4�u,�k�� �#Xu�5��2,�|G�*�c$�#�ЇV�Y����2�}	%`�\�E_-�����)�'���/KnZA�R	��6�`�"�苂K�����$iyL��>p�#�?����o��y�r����ж���gI���{�sw�<�f�5ѫ"+���ڍ�ge�1�#,�}�z�
�
�*`|�`��H����^	��Gy^�l��r�����2���B�JyF�&��""s�3�^�]ˡ�K8˲P�ݚ�Og��(�#��g>���i?��u�`LAj#�R�ʽ_	 �k��*������V,T��е$�]�s�ҕ(�9�%�i[V��.,3/�B�1������X��Vq�s|�U~��ܐ��G�k�c�_�B���D�VT���0aRVe�|Y,MxFGN��7���^
�3�Ѧ��4��<B7p���o��Y%������#��4�	8���Q�dщ���!��@d�B��[�w�ˢ_�ry���c,�1qS��rW�M(���)�U&�TU��ȱ䱵��C�F��B�e�;]%ʺِ����!�;��O��N��H/�sʟU9$�����dӠw��An~��/����)��GK%WS��]�
Um� _���Rr���-J��UR¯?I��I#�!�~�o�bU�J���Yn>Kc��t_����,���aZ􋎋q)�:�Re��*#ѝ�x��.���i�};��^�}\J �K��wm��
��N���cu���C�ac�Tn���]�w�*#�6����q� ��R��ݪm*�3���ֵ���i��b�r�J�0�ܭ��J-���'�9�2⸺�H6Tf.��C�=�صe3_V^�0Y�<��%�����q۹�$�a�	�{l��nݙ~6v1�[�6�-t"M5Kd��j&K��*��LV��2�E�L�lΫL�n��f�0�C"�Z%F����(�!q.��3f0�\��T˖G 켝�6�VUk3�=��ޮ��m�N���V��g%�V�fT�^5���Ҵ����	Z�c?�Չ��z%�z�En��)�Yۇ�׵��~���3��`�8h�%J#�� !p��@����H����<���￱�/���o��D�X�j0�kt'M
9�m�K�Z# �I� k���K�w�aP���b:8���*�\�;��N�zkR�6N\���\��
�v%L��I�����P�Q�c�8����L���z��B�cC���?$v���ێg�޹1�-�i��و��&7���c=�~�a���Af4ÎtH%4LٵX���A�G�4����V���AR�ا��ጊ R'�������Ʀ���^�)�:�N��R��D9+G]��r��%��kV�������V�,�Z>V/p�z�T9J���{�p������� �D�SD����ϻǟ;�_p��j���j�&I�s�u������}|UvƧ���AW�S��3��ۀ�&�J�gP��+����� ��́��	œ�r5Ɠ]Yt�:�a�PV�������
��L5Ѻ�t�]̰��9��'`�%T�KRt�v��������ޫ��&�!ɱhae�,}꺯�b�PNU�=��F��w��~x�$5&��Tf����"�R��d�Y�{5������A���)��������ܶᲐ`�e|��إ��8�Y�Nr^@���uQ5�(�9S�'��GP��1����ɱH.&`>�J+yl���<fY�ZYg?���Q�ϫt�ۧ�63�Ǩ���:��bQ#��wtP�篙��������uO��s��/�������fǁ�}]jh1hz��h�W�ЯZ���#H�9.�r��:j^�0|�}���bхA�q@�A��G�,t���&�b���^���j�� B�z!�=s�8��$#ȉ�W
$��Y��pk3Y���ͺ�Q*��n����h!U�ՐP����������C"!ͶB�*{�4���>�����<��0���f��n�����9Th(�A�0��.�J[���Cp}�������;G�      �   !  x�U��i1�{�H���M����A �t���]�q0�jd�dH��S���>d(�a�I�Z �NEP<��th�}������j�h�-������$������}9�&� c5�M�<#o�ArU8���~���jV�� �؉�LP2�X�2����_]͢/����ED	�KɁ�H&� >Iي ,"�J'�8�˷O��� ��4Q\��J��Z�B r.���|-!pˋ�Ij�|Z�M�ߖ��U�h'�������<�
�~f1div(�~&�H��(��q��<�r      �   &  x���I��H�������q#���-����@��B �B,���G��OX�1��
"�|��%E��7���-�f��A�8��~��/$�%��1]�Z�Zu+��i�J����<�˼[#˛�j��὆5/E=��hDY�70�l`7 K�6�`Et9K(��~致,���?£�����i��|��	���uH�
�F��b�Dpf�!h`�Ű�A���o�$��c�"	�a��gV���H��+�b�lh���-�-1o7.���L娞���j�8؛bd��Y�S�ōM&��!6&ѐ�~x"�/�����f�A�<&�s���y[�T`����dT���j��+F�JP�w�����*ڭ7F��:�!�>�۵ZU�oy�X��Ktp�I�zqw��o�6����@
�6H�lHU��� N��m�u:/�!�j�c�>ةl��u1X��6_� �&3�k��ȿ_J$��!��\��9ٗ}�2br��Q�&������8j�%x�\�94��eN+�]����J;T�zx+� �}:8�.�T�H�2�Q�ڥ��N�\�Tr}5ʜ��bek�.���T����tAR��E���.8�/Ύ����Jo�@(Z���v�L��RC[C��_�0^�⧈����ew� �s����߷s�������Zǭ!�-�<�GDҐ����P]��
�I�Iя8Q?��Y�O$4Wb��>�٭�m�ၒU�c~����/Ree� Bӣ���U�$k?@�,1O`>��Yy�Ҡ��2�pI�ʢZ\˄��g��7ǻA��M>�&w�Cz�Mi�G��o����@A�7�-��,�J����O�\ ���U��4Q-oF�*La��ﾽ�9)ds	�V�����U���V��H�Vp�2�L��_��*�=(��L+p�ߟ�%�4�����kJ����U%�-(RP|v����d-��ML����u�A����EN##;��rm��M�5��C��;�{g/_iC*�j���us.i���/5�E�t���P�w-_ܖ;Nnt��t�|�_^^��r�      �   (   x�3��46�43�213��L�As.��%W� �E      �   u  x�՘Io�F�����=n����޸	&�� A��plz$M�d���d[cN�¶@����꽪N?)���[��
�ښ %��Z  ��X� �,��殪����	p��1�C&�ƀ��-��Ѵ���> ��iY�-���ry���e������ï�j�^7�jV6៳r9o�7ᇲ�|Y���e H�������U�$��&xޖ���巒�����f�4�z�~�]lֳ��Ӽ�?��}�K�,�U|��|�.��oe�l�R�C	��J�*����G}��O�~"�m�c�"��j��Q���	�,�3�}V���E�'���ۆ"�t��O�PQ>r��Hl��@2���~�|=�ccmc�H�6@�J0�R���%�\d���#����j�(��k�na|�~����1Pg�KY׿6w�f5��j%�ޒ�e2yj��� ͞��X�V2j�dZb�h6�"'�1�$Zgu	�^��2
4~���<�U��W�����j��X~�G���л��6O�R� ;��#��4ښё��;x�@�����h��Z�}����,����Պ�'�`����Xad�#�s�Z�/���8kl����P�l]tD�Y�O�V<
=y��"&A,�"/�Me'b 3�uk�~��N��pR�3cv[(�[0�N�%���i�8Íkd	�1&^��Q�	��27SY��B/�SCJ �>��i���c�TB.2�P�N�v����L3k��d�[��s�^�*��G�0l[�]#�ESٵ&Y2�S�SnZ�P�0��۫���F�*�&`_
'��
�p&l�Jw��7�x4�q�(��G��י�IS25����I����=wj"y�ܛ���ӊQqg����!�g�D�4Y�S/t�C�ӏ�kǵ�r䏻3���NQ�[&������lD����D��p�٭�g�����������=�Eh�SK�Ss% ����^>t��<���;�[ٱ�aIp�����]���P_����ӟ�p0G�)�8�߿d&�rQ�HF'�
�.��3~�F$�Cw�>�xG�,+H(Y���c��$D*rJ��t��2�K���ͽ`;��c�� ���-*tf���֢lšw�ض+���������V��      �   O   x�mʻ�0�Z�`{�L����)}�(��I�+�d�4/��SGLn��(^��ץ�F��R����h|~hO[��ݶ{     