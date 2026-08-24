/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export const Collections = {
	Authorigins: "_authOrigins",
	Externalauths: "_externalAuths",
	Mfas: "_mfas",
	Otps: "_otps",
	Superusers: "_superusers",
	Article: "article",
	Challenge: "challenge",
	ChallengeCategory: "challenge_category",
	Club: "club",
	ClubActivity: "club_activity",
	ClubMember: "club_member",
	Faction: "faction",
	Participation: "participation",
	Policies: "policies",
	Roles: "roles",
	Status: "status",
	Team: "team",
	Users: "users",
	Validation: "validation",
	Wei: "wei",
} as const
export type Collections = typeof Collections[keyof typeof Collections]

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

export type GeoPoint = {
	lon: number
	lat: number
}

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export type ArticleRecord = {
	author_id?: string
	content?: string
	created: IsoAutoDateString
	editor_id?: string
	id: string
	modified_at?: IsoDateString
	published_at?: IsoDateString
	title?: string
	updated: IsoAutoDateString
}

export const ChallengeDifficultyOptions = {
	"E1": "1",
	"E2": "2",
	"E3": "3",
	"E4": "4",
	"E5": "5",
} as const
export type ChallengeDifficultyOptions = typeof ChallengeDifficultyOptions[keyof typeof ChallengeDifficultyOptions]

export const ChallengePhaseOptions = {
	"parcours": "parcours",
	"olympiades": "olympiades",
} as const
export type ChallengePhaseOptions = typeof ChallengePhaseOptions[keyof typeof ChallengePhaseOptions]

export const ChallengeScopeOptions = {
	"individual": "individual",
	"team": "team",
} as const
export type ChallengeScopeOptions = typeof ChallengeScopeOptions[keyof typeof ChallengeScopeOptions]

export const ChallengeProofTypeOptions = {
	"image": "image",
	"video": "video",
	"link": "link",
} as const
export type ChallengeProofTypeOptions = typeof ChallengeProofTypeOptions[keyof typeof ChallengeProofTypeOptions]
export type ChallengeRecord = {
	category?: RecordIdString[]
	created: IsoAutoDateString
	description?: string
	difficulty?: ChallengeDifficultyOptions
	end_date?: IsoDateString
	id: string
	image?: FileNameString
	location?: GeoPoint
	max_validations?: number
	phase?: ChallengePhaseOptions
	points?: number
	proof_type?: ChallengeProofTypeOptions[]
	relation?: RecordIdString
	scope?: ChallengeScopeOptions
	start_date?: IsoDateString
	title?: string
	type?: string
	updated: IsoAutoDateString
	wei?: RecordIdString
}

export type ChallengeCategoryRecord = {
	color?: string
	created: IsoAutoDateString
	icon?: FileNameString
	id: string
	name?: string
	updated: IsoAutoDateString
	wei?: RecordIdString
}

export type ClubRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	name?: string
	updated: IsoAutoDateString
}

export type ClubActivityRecord = {
	club?: RecordIdString
	created: IsoAutoDateString
	date?: IsoDateString
	description?: string
	id: string
	location?: string
	title?: string
	updated: IsoAutoDateString
}

export const ClubMemberRoleOptions = {
	"member": "member",
	"president": "president",
} as const
export type ClubMemberRoleOptions = typeof ClubMemberRoleOptions[keyof typeof ClubMemberRoleOptions]
export type ClubMemberRecord = {
	club?: RecordIdString
	created: IsoAutoDateString
	id: string
	joined_at?: IsoDateString
	role?: ClubMemberRoleOptions
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type FactionRecord = {
	color?: string
	created: IsoAutoDateString
	description?: string
	id: string
	logo?: FileNameString
	name?: string
	updated: IsoAutoDateString
	wei?: RecordIdString
}

export const ParticipationRoleOptions = {
	"team_leader": "team_leader",
	"student": "student",
} as const
export type ParticipationRoleOptions = typeof ParticipationRoleOptions[keyof typeof ParticipationRoleOptions]
export type ParticipationRecord = {
	created: IsoAutoDateString
	id: string
	role?: ParticipationRoleOptions
	team?: RecordIdString
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type PoliciesRecord = {
	action: string
	created: IsoAutoDateString
	id: string
	name?: string
	resource: string
	updated: IsoAutoDateString
}

export type RolesRecord = {
	code: string
	color: string
	created: IsoAutoDateString
	description?: string
	id: string
	label: string
	policies?: RecordIdString[]
	updated: IsoAutoDateString
}

export type StatusRecord = {
	author?: RecordIdString
	created: IsoAutoDateString
	expires_at?: IsoDateString
	id: string
	issued_at?: IsoDateString
	reason?: string
	type?: string
	updated: IsoAutoDateString
	user?: RecordIdString
}

export type TeamRecord = {
	color?: string
	created: IsoAutoDateString
	description?: string
	id: string
	name?: string
	updated: IsoAutoDateString
	wei?: RecordIdString
}

export const UsersSchoolYearOptions = {
	"E1": "1",
	"E2": "2",
	"E3": "3",
} as const
export type UsersSchoolYearOptions = typeof UsersSchoolYearOptions[keyof typeof UsersSchoolYearOptions]

export const UsersLevelOptions = {
	"ingenieur": "ingenieur",
	"preparatoire": "preparatoire",
} as const
export type UsersLevelOptions = typeof UsersLevelOptions[keyof typeof UsersLevelOptions]

export const UsersSpecialityOptions = {
	"info": "info",
	"tis": "tis",
	"mat": "mat",
	"snr": "snr",
} as const
export type UsersSpecialityOptions = typeof UsersSpecialityOptions[keyof typeof UsersSpecialityOptions]
export type UsersRecord = {
	account_type?: string
	avatar?: FileNameString
	created: IsoAutoDateString
	deleted?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	level?: UsersLevelOptions
	password: string
	roles?: RecordIdString[]
	school_year?: UsersSchoolYearOptions
	speciality?: UsersSpecialityOptions
	tokenKey: string
	updated: IsoAutoDateString
	username: string
	username_changed_at?: IsoDateString
	verified?: boolean
}

export type ValidationRecord = {
	challenge?: RecordIdString
	created: IsoAutoDateString
	id: string
	points_awarded?: number
	proof_file?: FileNameString
	proof_text?: string
	public?: boolean
	reason?: string
	reviewed_at?: IsoDateString
	status?: string
	submitted_at?: IsoDateString
	team?: RecordIdString
	updated: IsoAutoDateString
	user?: RecordIdString
	validator?: RecordIdString
}

export type WeiRecord<Tdefault_points = unknown> = {
	created: IsoAutoDateString
	date?: IsoDateString
	default_points?: null | Tdefault_points
	description?: string
	ending_date?: IsoDateString
	id: string
	location?: GeoPoint
	registration_closes_at?: IsoDateString
	registration_opens_at?: IsoDateString
	reveal_at?: IsoDateString
	show_location?: boolean
	starting_date?: IsoDateString
	theme?: string
	title?: string
	updated: IsoAutoDateString
	year?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ArticleResponse<Texpand = unknown> = Required<ArticleRecord> & BaseSystemFields<Texpand>
export type ChallengeResponse<Texpand = unknown> = Required<ChallengeRecord> & BaseSystemFields<Texpand>
export type ChallengeCategoryResponse<Texpand = unknown> = Required<ChallengeCategoryRecord> & BaseSystemFields<Texpand>
export type ClubResponse<Texpand = unknown> = Required<ClubRecord> & BaseSystemFields<Texpand>
export type ClubActivityResponse<Texpand = unknown> = Required<ClubActivityRecord> & BaseSystemFields<Texpand>
export type ClubMemberResponse<Texpand = unknown> = Required<ClubMemberRecord> & BaseSystemFields<Texpand>
export type FactionResponse<Texpand = unknown> = Required<FactionRecord> & BaseSystemFields<Texpand>
export type ParticipationResponse<Texpand = unknown> = Required<ParticipationRecord> & BaseSystemFields<Texpand>
export type PoliciesResponse<Texpand = unknown> = Required<PoliciesRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Texpand = unknown> = Required<RolesRecord> & BaseSystemFields<Texpand>
export type StatusResponse<Texpand = unknown> = Required<StatusRecord> & BaseSystemFields<Texpand>
export type TeamResponse<Texpand = unknown> = Required<TeamRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type ValidationResponse<Texpand = unknown> = Required<ValidationRecord> & BaseSystemFields<Texpand>
export type WeiResponse<Tdefault_points = unknown, Texpand = unknown> = Required<WeiRecord<Tdefault_points>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	article: ArticleRecord
	challenge: ChallengeRecord
	challenge_category: ChallengeCategoryRecord
	club: ClubRecord
	club_activity: ClubActivityRecord
	club_member: ClubMemberRecord
	faction: FactionRecord
	participation: ParticipationRecord
	policies: PoliciesRecord
	roles: RolesRecord
	status: StatusRecord
	team: TeamRecord
	users: UsersRecord
	validation: ValidationRecord
	wei: WeiRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	article: ArticleResponse
	challenge: ChallengeResponse
	challenge_category: ChallengeCategoryResponse
	club: ClubResponse
	club_activity: ClubActivityResponse
	club_member: ClubMemberResponse
	faction: FactionResponse
	participation: ParticipationResponse
	policies: PoliciesResponse
	roles: RolesResponse
	status: StatusResponse
	team: TeamResponse
	users: UsersResponse
	validation: ValidationResponse
	wei: WeiResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
